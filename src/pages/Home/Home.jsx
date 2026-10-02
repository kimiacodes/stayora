import Hero from '../../components/Hero/Hero'
import FeaturedStays from '../../components/FeaturedStays/FeaturedStays'
import PopularDestinations from '../../components/PopularDestinations/PopularDestinations'
import WhyStayora from '../../components/WhyStayora/WhyStayora'
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection'
import HomeCTA from '../../components/HomeCTA/HomeCTA'
import Footer from '../../components/Footer/Footer'

function Home() {
  return (
    <main>

      <Hero />

      <FeaturedStays />
      <PopularDestinations />
       <WhyStayora />
        <ExperienceSection />
        <HomeCTA />

      

    </main>
  )
}

export default Home