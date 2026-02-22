import { m, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { aboutText, personalInfo } from "@/data/portfolio";
import { MapPin, Mail, Zap } from "lucide-react";

const AboutSection = () => {
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
    <section id="about" ref={ref} className="section-padding bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-muted/30 via-transparent to-transparent blur-3xl" />

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow relative z-10"
      >
        <m.div variants={itemVariants} className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground bg-muted/30 rounded-full border border-border/30 mb-6">
            <Zap className="w-3.5 h-3.5" />
            About Me
          </span>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <m.div variants={itemVariants}>
            <h2 className="heading-lg mb-6 text-glow">
              Crafting digital{" "}
              <span className="text-muted-foreground">experiences</span> that
              matter
            </h2>
          </m.div>

          <m.div variants={itemVariants} className="space-y-6">
            <p className="text-xl leading-relaxed text-foreground/80">
              {aboutText.intro}
            </p>
            <p className="body-md">
              {aboutText.description}
            </p>
            <p className="text-sm font-semibold text-foreground bg-muted/30 px-4 py-3 rounded-xl border border-border/30 inline-block">
              {aboutText.focus}
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="p-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </span>
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </span>
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
};

export default AboutSection;
