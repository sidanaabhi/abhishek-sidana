import { motion } from "framer-motion";
import { certifications } from "../data/portfolio";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import { SiKubernetes } from "react-icons/si";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  aws: FaAws,
  azure: FaMicrosoft,
  kubernetes: SiKubernetes,
};

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          <span className="text-secondary">Certified</span> Expertise
        </h2>
        <p className="text-on-surface-variant mb-12 max-w-xl">
          Industry-recognized credentials validating deep cloud and AI
          proficiency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => {
          const Icon = iconMap[cert.icon];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group bg-surface-highest p-6 rounded-lg relative overflow-hidden hover:shadow-[0_0_24px_rgba(76,214,251,0.05)] transition-shadow"
            >
              <div className="w-12 h-12 rounded-md bg-linear-to-br from-primary/20 to-primary-container/20 flex items-center justify-center mb-4">
                {Icon && <Icon className="text-primary text-2xl" />}
              </div>

              <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                {cert.title}
              </h3>
              <p className="font-display text-xs tracking-[0.1em] uppercase text-on-surface-variant">
                {cert.issuer}
              </p>

              <div className="absolute inset-0 rounded-lg border border-outline-variant/0 group-hover:border-outline-variant/40 transition-all pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
