import "./index.css"
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import ClientSection from "@/components/ClientSection";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <Hero />
        <ClientSection />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
