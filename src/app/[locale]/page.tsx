"use client";

import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import About from "../../components/About";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <CTA />
      <Footer />
    </>
  );
}
