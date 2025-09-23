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
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
