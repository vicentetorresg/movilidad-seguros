"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Simulator from "@/components/Simulator";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ClientPage() {
  useEffect(() => {
    // Force scroll to top on load (fixes Instagram in-app browser auto-scroll)
    setTimeout(() => window.scrollTo(0, 0), 1);
  }, []);

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
