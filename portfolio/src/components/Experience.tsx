import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { career, education } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          <span className="text-secondary">Career</span> Timeline
        </h2>
        <p className="text-on-surface-variant mb-16 max-w-xl">
          My professional journey in cloud platforms and AI infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Career */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Briefcase size={18} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-on-surface">
              Experience
            </h3>
          </div>

          <div className="relative">
            <div className="space-y-8">
              {career.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-8"
                >
                  {/* Connecting line — only between dots, not after the last one */}
                  {i < career.length - 1 && (
                    <div className="absolute left-[7px] top-4 bottom-[-32px] w-[2px] bg-surface-variant" />
                  )}

                  {i === 0 ? (
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background animate-pulse" />
                  ) : (
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                  )}

                  <p className="font-display text-xs tracking-[0.1em] uppercase text-on-surface-variant">
                    {item.period}
                  </p>
                  <h4 className="font-display text-base font-semibold text-on-surface mt-1">
                    {item.role}
                  </h4>
                  <p className="text-primary-container text-sm font-medium">
                    {item.company}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center">
              <GraduationCap size={18} className="text-secondary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-on-surface">
              Education
            </h3>
          </div>

          <div className="relative">
            <div className="space-y-8">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-8"
                >
                  {i < education.length - 1 && (
                    <div className="absolute left-[7px] top-4 bottom-[-32px] w-[2px] bg-surface-variant" />
                  )}

                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-secondary bg-background" />

                  <p className="font-display text-xs tracking-[0.1em] uppercase text-on-surface-variant">
                    {item.period}
                  </p>
                  <h4 className="font-display text-base font-semibold text-on-surface mt-1">
                    {item.degree}
                  </h4>
                  <p className="text-primary-container text-sm font-medium">
                    {item.institution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
