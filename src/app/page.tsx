import "./index.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import ClientSection from "@/components/ClientSection";
import { About } from "@/components/about/About";
import { Products } from "@/components/products/Products";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Certifications } from "@/components/Certifications";
import { Cta } from "@/components/Cta";
import { ROICalculator } from "@/components/ROICalculator";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/contact-form/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <Hero />
        <ClientSection />
        <About />
        <Products />
        <HowItWorks />
        <Features />
        <Services />
        <Certifications />
        <Cta />
        <ROICalculator />
        <FAQ />
        <ContactForm />
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}
