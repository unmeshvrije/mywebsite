import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Teaching from "@/components/Teaching";
import Work from "@/components/Work";
import Blogs from "@/components/Blogs";
import Podcast from "@/components/Podcast";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Teaching />
        <Work />
        <Blogs />
        <Podcast />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
