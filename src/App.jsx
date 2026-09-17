import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Differentiators from "./components/Differentiators";
import Catalog from "./components/Catalog";
import PhonePreview from "./components/PhonePreview";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";

function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Differentiators />
        <Catalog />
        <PhonePreview />
        <Contact />
      </main>
      <Footer />
      <WhatsappFloat />
      <Analytics />
    </LanguageProvider>
  );
}

export default App;
