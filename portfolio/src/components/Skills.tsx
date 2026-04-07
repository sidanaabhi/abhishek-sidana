import { motion } from "framer-motion";
import { skillCategories } from "../data/portfolio";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import {
  SiTerraform,
  SiKubernetes,
  SiPython,
  SiGo,
  SiDocker,
  SiGnubash,
  SiArgo,
  SiGithubactions,
} from "react-icons/si";
import {
  TbBrain,
  TbApi,
  TbCpu,
  TbChartDots3,
  TbDatabase,
  TbScale,
  TbNetwork,
  TbWorldWww,
} from "react-icons/tb";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  aws: FaAws,
  azure: FaMicrosoft,
  terraform: SiTerraform,
  kubernetes: SiKubernetes,
  python: SiPython,
  golang: SiGo,
  docker: SiDocker,
  bash: SiGnubash,
  argocd: SiArgo,
  github: SiGithubactions,
  brain: TbBrain,
  api: TbApi,
  gpu: TbCpu,
  langchain: TbChartDots3,
  pinecone: TbDatabase,
  database: TbDatabase,
  cdn: TbWorldWww,
  networking: TbNetwork,
  loadbalancer: TbScale,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          <span className="text-secondary">Tech</span> Stack
        </h2>
        <p className="text-on-surface-variant mb-12 max-w-xl">
          Specialized tools and platforms I use to build scalable infrastructure.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.title}
            variants={cardVariant}
            className="group bg-surface-low rounded-lg p-6 hover:bg-surface-container transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />

            <h3 className="font-display text-sm tracking-[0.1em] uppercase text-on-surface-variant mb-4">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => {
                const Icon = iconMap[skill.icon];
                return (
                  <motion.span
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-surface-variant/50 text-on-surface rounded-sm hover:bg-surface-highest/60 hover:shadow-[0_0_12px_rgba(76,214,251,0.08)] transition-colors cursor-default"
                  >
                    {Icon && (
                      <Icon className="text-primary/70 text-base shrink-0" />
                    )}
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
