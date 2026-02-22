import { m, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";
import { Code2, Check } from "lucide-react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow relative z-10"
      >
        <m.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground bg-muted/30 rounded-full border border-border/30 mb-6">
            <Code2 className="w-3.5 h-3.5" />
            Expertise
          </span>
          <h2 className="heading-lg text-glow mb-4">
            Technologies & Tools
          </h2>
          <p className="body-lg max-w-xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, groupIndex) => (
            <m.div
              key={skillGroup.category}
              variants={itemVariants}
              className="group"
            >
              <m.div 
                className="p-6 rounded-2xl bg-gradient-card border border-border/30 h-full card-glow"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-bold text-foreground mb-6 pb-4 border-b border-border/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground pulse-glow" />
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <m.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: groupIndex * 0.1 + skillIndex * 0.05 + 0.4,
                        duration: 0.4,
                      }}
                      className="text-sm text-muted-foreground flex items-center gap-3 group/item hover:text-foreground transition-colors duration-300"
                    >
                      <Check className="w-3.5 h-3.5 text-muted-foreground/50 group-hover/item:text-foreground transition-colors" />
                      {skill}
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default SkillsSection;
