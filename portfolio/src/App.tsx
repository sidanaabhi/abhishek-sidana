import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
const BackgroundAnimation = lazy(() => import("./components/BackgroundAnimation"));

export default function App() {
  return (
    <div className="min-h-screen relative">
      <Suspense fallback={null}>
        <BackgroundAnimation />
      </Suspense>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Certifications />
      <Footer />
    </div>
  );
}
