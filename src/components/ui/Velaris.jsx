
import { useEffect, useRef } from "react";

const DEFAULT_COLORS = [
  "#8b7355",
  "#c5a880",
  "#4b4035",
  "#111111",
];

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3 u_colors[4];
uniform vec3 u_bg;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y)
    ? vec2(1.0, 0.0)
    : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 -
    0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;

  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;

  float ratio = u_resolution.x / u_resolution.y;

  vec2 p = uv - 0.5;
  p.x *= ratio;

  float t = u_time * 0.1;

  float n1 = snoise(
    p * 0.4 + vec2(t * 0.2, -t * 0.3)
  );

  float n2 = snoise(
    p * 0.55 +
    vec2(-t * 0.15, t * 0.25) +
    n1 * 0.25
  );

  float n3 = snoise(
    p * 0.75 +
    vec2(t * 0.1, -t * 0.2) +
    n2 * 0.2
  );

  vec3 col = u_bg;

  float dist = length(p) * 1.5;

  float vignette =
    1.0 - smoothstep(0.3, 1.2, dist);

  col = mix(
    col,
    u_colors[0],
    smoothstep(-0.2, 0.5, n1) * 0.85
  );

  col = mix(
    col,
    u_colors[1],
    smoothstep(-0.1, 0.6, n2) * 0.7
  );

  col = mix(
    col,
    u_colors[2],
    smoothstep(-0.3, 0.4, n3) * 0.6
  );

  col = mix(
    col,
    u_colors[3],
    smoothstep(0.0, 0.7, n1 * n2) * 0.5
  );

  float glow =
    smoothstep(0.8, 0.0, dist) * 0.3;

  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain =
    fract(
      sin(dot(uv, vec2(12.9898, 78.233))) *
      43758.5453 +
      u_time
    );

  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex) {
  const value = hex.replace("#", "");

  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

const Velaris = ({
  bg = "#090909",
  colors = DEFAULT_COLORS,
  speed = 1.2,
  grain = 0.25,
  height = "100%",
  className = "",
  children,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // مقایسه رنگ‌ها بر اساس مقدارشان، نه هویت آرایه
  const colorsKey = colors.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    let gl = null;
    let animationFrame = null;
    let resizeObserver = null;
    let resources = null;
    let disposed = false;
    let startTime = null;

    const rgbColors = new Float32Array(
      colors.flatMap(hexToRgb)
    );

    const bgColor = hexToRgb(bg);

    const cancelRender = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const resize = () => {
      if (!gl || gl.isContextLost()) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      // محدود کردن DPR برای کاهش مصرف GPU در موبایل
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);

      if (
        canvas.width !== pixelWidth ||
        canvas.height !== pixelHeight
      ) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const createShader = (context, type, source) => {
      const shader = context.createShader(type);

      if (!shader) return null;

      context.shaderSource(shader, source);
      context.compileShader(shader);

      if (
        !context.getShaderParameter(
          shader,
          context.COMPILE_STATUS
        )
      ) {
        console.error(
          "Velaris shader error:",
          context.getShaderInfoLog(shader)
        );

        context.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const initializeWebGL = () => {
      if (disposed) return;

      const context = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        powerPreference: "default",
      });

      if (!context) {
        console.error("Velaris: WebGL is unavailable.");
        return;
      }

      if (context.isContextLost()) return;

      gl = context;

      const vertexShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderGLSL
      );

      const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderGLSL
      );

      if (!vertexShader || !fragmentShader) {
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);

        return;
      }

      const program = gl.createProgram();

      if (!program) {
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return;
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
          "Velaris program error:",
          gl.getProgramInfoLog(program)
        );

        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        return;
      }

      const buffer = gl.createBuffer();

      if (!buffer) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(
        program,
        "position"
      );

      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(
        position,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      const locations = {
        resolution: gl.getUniformLocation(
          program,
          "u_resolution"
        ),
        time: gl.getUniformLocation(program, "u_time"),
        grain: gl.getUniformLocation(program, "u_grain"),
        colors: gl.getUniformLocation(program, "u_colors"),
        bg: gl.getUniformLocation(program, "u_bg"),
      };

      resources = {
        program,
        vertexShader,
        fragmentShader,
        buffer,
        locations,
      };

      resize();

      const render = (time) => {
        animationFrame = null;

        if (disposed || !gl || gl.isContextLost()) return;

        if (startTime === null) {
          startTime = time;
        }

        const elapsed = time - startTime;

        gl.useProgram(resources.program);

        gl.uniform2f(
          locations.resolution,
          canvas.width,
          canvas.height
        );

        gl.uniform1f(
          locations.time,
          elapsed * 0.001 * speed
        );

        gl.uniform1f(locations.grain, grain);
        gl.uniform3f(locations.bg, ...bgColor);
        gl.uniform3fv(locations.colors, rgbColors);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        animationFrame = requestAnimationFrame(render);
      };

      animationFrame = requestAnimationFrame(render);
    };

    const handleContextLost = (event) => {
      // به مرورگر اجازه می‌دهد در صورت امکان context را بازیابی کند
      event.preventDefault();

      cancelRender();

      gl = null;
      resources = null;
      startTime = null;
    };

    const handleContextRestored = () => {
      if (disposed) return;

      startTime = null;
      initializeWebGL();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      // بعد از بازگشت به صفحه، اندازه و رندر را تازه می‌کنیم
      if (!gl || gl.isContextLost()) return;

      resize();

      if (animationFrame === null && resources) {
        startTime = null;

        animationFrame = requestAnimationFrame((time) => {
          animationFrame = null;

          if (!disposed && gl && !gl.isContextLost()) {
            gl.useProgram(resources.program);

            gl.uniform2f(
              resources.locations.resolution,
              canvas.width,
              canvas.height
            );

            gl.uniform1f(resources.locations.time, 0);
            gl.uniform1f(resources.locations.grain, grain);
            gl.uniform3f(resources.locations.bg, ...bgColor);
            gl.uniform3fv(resources.locations.colors, rgbColors);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            startTime = time;
            animationFrame = requestAnimationFrame((nextTime) => {
              if (!disposed && gl && !gl.isContextLost()) {
                const elapsed = nextTime - startTime;

                gl.useProgram(resources.program);
                gl.uniform2f(
                  resources.locations.resolution,
                  canvas.width,
                  canvas.height
                );
                gl.uniform1f(
                  resources.locations.time,
                  elapsed * 0.001 * speed
                );
                gl.uniform1f(
                  resources.locations.grain,
                  grain
                );
                gl.uniform3f(
                  resources.locations.bg,
                  ...bgColor
                );
                gl.uniform3fv(
                  resources.locations.colors,
                  rgbColors
                );
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

                animationFrame = requestAnimationFrame(
                  arguments.callee
                );
              }
            });
          }
        });
      }
    };

    canvas.addEventListener(
      "webglcontextlost",
      handleContextLost
    );

    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    initializeWebGL();

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;

      cancelRender();
      resizeObserver?.disconnect();

      canvas.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );

      canvas.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (gl && resources && !gl.isContextLost()) {
        gl.deleteBuffer(resources.buffer);
        gl.deleteProgram(resources.program);
        gl.deleteShader(resources.vertexShader);
        gl.deleteShader(resources.fragmentShader);
      }

      resources = null;
      gl = null;
    };
  }, [bg, colorsKey, speed, grain]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default Velaris;
