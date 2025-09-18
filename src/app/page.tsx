import "./index.css"
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import ClientSection from "@/components/ClientSection";
import { About } from "@/components/about/About";
import { Products } from "@/components/products/Products";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <Hero />
    <ClientSection />
    <About />
    <Products />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
