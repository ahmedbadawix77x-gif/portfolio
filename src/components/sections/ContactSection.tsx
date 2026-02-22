import { m, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight, Github, Linkedin, Twitter, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-foreground text-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-background/10 via-transparent to-transparent blur-3xl" />

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow text-center relative z-10"
      >
        <m.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-background/60 bg-background/10 rounded-full border border-background/10 backdrop-blur-sm">
            <Send className="w-3.5 h-3.5" />
            Get in Touch
          </span>
        </m.div>

        <m.h2 
          variants={itemVariants} 
          className="heading-lg mb-6"
          style={{ 
            textShadow: '0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(255,255,255,0.1)' 
          }}
        >
          Let's work together
        </m.h2>

        <m.p
          variants={itemVariants}
          className="text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-12"
        >
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </m.p>

        <m.div variants={itemVariants} className="mb-12">
          <m.a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 px-10 py-5 text-base font-semibold bg-background text-foreground rounded-full overflow-hidden relative btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            <span className="relative z-10">Send me an email</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </m.a>
        </m.div>

        <m.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <m.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-background/10 border border-background/10 text-background/60 hover:text-background hover:bg-background/20 hover:border-background/20 transition-all duration-300"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </m.a>
          ))}
        </m.div>
      </m.div>
    </section>
  );
};

export default ContactSection;
