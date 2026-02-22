import { m, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { education } from "@/data/portfolio";
import { GraduationCap, Calendar, Award } from "lucide-react";

const EducationSection = () => {
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
    <section id="education" ref={ref} className="section-padding relative overflow-hidden bg-gradient-subtle">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow relative z-10"
      >
        <m.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground bg-muted/30 rounded-full border border-border/30 mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            Education
          </span>
          <h2 className="heading-lg text-glow mb-4">
            Academic Background
          </h2>
          <p className="body-lg max-w-xl mx-auto">
            My educational foundation.
          </p>
        </m.div>

        <div className="space-y-8">
            {education.map((edu, index) => (
              <m.div
                key={edu.id}
                variants={itemVariants}
                className="relative group"
              >
                <m.div 
                    className="p-8 rounded-2xl bg-gradient-card border border-border/30 card-glow hover:border-border/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                >
                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                        <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {edu.period}
                            </div>
                            <h3 className="text-xl font-bold text-foreground">
                                {edu.institution}
                            </h3>
                            <p className="text-lg text-muted-foreground">
                                {edu.degree}
                            </p>
                        </div>
                        
                        <div className="flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/20">
                           <Award className="w-5 h-5 text-foreground mt-0.5" />
                           <p className="text-sm font-medium leading-relaxed">
                               {edu.description}
                           </p>
                        </div>
                    </div>
                </m.div>
              </m.div>
            ))}
        </div>
      </m.div>
    </section>
  );
};

export default EducationSection;
