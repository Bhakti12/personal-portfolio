import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ApiConsole from "@/components/ApiConsole";
import Games from "@/components/Games";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-matrix/20 selection:text-matrix overflow-hidden">
      {/* Global Header / Nav */}
      <Nav />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <ApiConsole />
        <Games />
        <Blogs />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
