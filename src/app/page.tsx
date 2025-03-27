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
      
        {/* //Todo: 
        //Todo: fotos voor producten <br/>
        //Todo: database maken<br/>
        //Todo: producten met fotos toevoegen<br/>
        //Todo: pagina maken voor eshop<br/>
        //Todo: koop en huur pagina<br/>
        //Todo:  mogelijkheden voor kopen en vullen winkelwagen<br/>
        //Todo: afrekenen<br/>
        //Todo: login pagina<br/>
        //Todo: signup pagina<br/>
        //Todo: afrekenen kan alleen met account<br/>
        
     */}
      <AppNavbar />
      <HeroSection/>
      {/* <SubHeader/> */}
      <SkiAdventureSection/>
      <ServicesSection />
      <Feature/>
      <RestaurantSection />
      <ContactSection />
      <AppFooter />
      
    </div>
  );
}
