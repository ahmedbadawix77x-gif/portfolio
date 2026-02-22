import { m, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { Briefcase, Calendar } from "lucide-react";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow relative z-10"
      >
        <m.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground bg-muted/30 rounded-full border border-border/30 mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            Career
          </span>
          <h2 className="heading-lg text-glow mb-4">
            Professional Journey
          </h2>
          <p className="body-lg max-w-xl mx-auto">
            My path through the world of software development.
          </p>
        </m.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <m.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <m.div 
                  className="absolute left-8 lg:left-1/2 top-8 w-4 h-4 -ml-2 rounded-full bg-foreground ring-4 ring-background pulse-glow z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                />

                {/* Content */}
                <div className={`ml-20 lg:ml-0 lg:w-[calc(50%-40px)] ${
                  index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                }`}>
                  <m.div 
                    className="p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border/30 card-glow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-glow-sm">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      {exp.company}
                    </p>
                    <p className="body-md">
                      {exp.description}
                    </p>
                  </m.div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
};

export default ExperienceSection;
