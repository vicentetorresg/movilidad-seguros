import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false });
const Simulator = dynamic(() => import("@/components/Simulator"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Simulator />
      <Services />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
