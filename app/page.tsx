import { Hero, Skills, Experience, Footer } from "../components/homePageElements"
import React from "react"

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Skills />
      <Experience />
      <Footer />
    </React.Fragment>
  );
}