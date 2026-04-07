import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import {
  siteConfig,
  rotatingTitles,
  heroDescription,
} from "../data/portfolio";
import { useRotatingText } from "../hooks/useRotatingText";


export default function Hero() {
  const currentTitle = useRotatingText(rotatingTitles, 3000);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl relative z-10"
      >
        <div className="mb-6 relative inline-block">
          <img
            src="/abhishek.jpg"
            alt={siteConfig.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-primary/30"
          />
          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(76,214,251,0.15)] pointer-events-none" />
        </div>

        <p className="text-on-surface-variant text-sm tracking-widest uppercase font-display mb-4">
          {siteConfig.location}
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-4">
          Hi, I'm{" "}
          <span className="bg-linear-to-br from-primary to-primary-container bg-clip-text text-transparent">
            {siteConfig.name.split(" ")[0]}
          </span>
        </h1>

        <div className="h-10 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-xl md:text-2xl text-secondary"
            >
              {currentTitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {heroDescription}
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#experience"
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-primary to-primary-container text-on-primary font-semibold rounded-md hover:brightness-110 transition"
          >
            View Experience
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 border border-outline-variant/40 text-on-surface rounded-md hover:bg-surface-container transition"
          >
            <Mail size={16} />
            Contact Me
          </a>
        </div>
      </motion.div>

    </section>
  );
}
