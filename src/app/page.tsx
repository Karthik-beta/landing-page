import "./index.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import ClientSection from "@/components/ClientSection";
import { About } from "@/components/about/About";
import { Products } from "@/components/products/Products";
import { HowItWorks } from "@/components/HowItWorks";

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
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
