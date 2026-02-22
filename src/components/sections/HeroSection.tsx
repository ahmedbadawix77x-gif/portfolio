import { m, type Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Floating Orbs - Optimized (Static or simple CSS animation) */}
      <div 
        className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial from-muted/40 via-muted/10 to-transparent blur-2xl opacity-30 float"
      />
      <div 
        className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-muted/30 via-transparent to-transparent blur-2xl opacity-40 float"
        style={{ animationDelay: '-3s' }}
      />

      {/* Noise Texture - Removed */}

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-narrow section-padding relative z-10 text-center"
      >
        {/* Status Badge */}
        <m.div variants={itemVariants} className="mb-8">
          <m.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-foreground/80 bg-muted/30 rounded-full border border-border/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for opportunities
          </m.span>
        </m.div>

        {/* Main Heading with Glow */}
        <m.h1
          variants={itemVariants}
          className="heading-xl mb-6 text-glow-lg"
        >
          {personalInfo.name}
        </m.h1>

        {/* Title with Sparkle */}
        <m.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <Sparkles className="w-5 h-5 text-muted-foreground" />
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
            {personalInfo.title}
          </p>
          <Sparkles className="w-5 h-5 text-muted-foreground" />
        </m.div>

        {/* Tagline */}
        <m.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.tagline}
        </m.p>

        {/* CTA Buttons */}
        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <m.a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-foreground text-background rounded-full overflow-hidden btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
          </m.a>
          <m.a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold border border-border/50 bg-background/30 backdrop-blur-sm rounded-full hover:bg-muted/50 hover:border-border transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </m.a>
        </m.div>

        {/* Social Links */}
        <m.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: personalInfo.social.github, label: "GitHub" },
            { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <m.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-muted/30 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border/50 transition-all duration-300 box-glow-hover"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </m.a>
          ))}
        </m.div>

        {/* Scroll Indicator */}
        <m.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <m.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll down"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </m.a>
        </m.div>
      </m.div>
    </section>
  );
};

export default HeroSection;
