import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import ContactSection from '@/components/contact-section';
import RestaurantSection from '@/components/restaurant-section';
import ServicesSection from '@/components/services-section';
import SkiAdventureSection from '@/components/adventure-section';
import SubHeader from "@/components/sub-header";
import HeroSection from "@/components/hero-section";
import Feature from "@/components/feature";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <AppNavbar />
      <HeroSection/>
      <SubHeader/>
      <SkiAdventureSection/>
      <ServicesSection />
      <Feature/>
      <RestaurantSection />
      <ContactSection />
      <AppFooter />
    </div>
  );
}
