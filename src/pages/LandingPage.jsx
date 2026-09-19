import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Differentiators from "../components/Differentiators";
import ImportantDates from "../components/ImportantDates";
import Catalog from "../components/Catalog";
import Templates from "../components/Templates";
import PhonePreview from "../components/PhonePreview";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsappFloat from "../components/WhatsappFloat";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Differentiators />
        <ImportantDates />
        <Catalog />
        <Templates />
        <PhonePreview />
        <Contact />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
