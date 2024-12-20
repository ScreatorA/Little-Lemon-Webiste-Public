import "./Main.css";
import Hero from "./Hero/Hero";
import Highlights from "./Highlights/Highlights";
import Testimonials from "./Testimonials/Testimonials";
import About from "./About/About";
import { useState } from "react";


export default function Main() {

  return (
    <>
      <Hero />
      <Highlights />
      <Testimonials />
      <About />
    </>
  );
}
