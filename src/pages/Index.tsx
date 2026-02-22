import { useState, useEffect, lazy, Suspense } from "react";
import { LazyMotion, domMax } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load sections
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/sections/ExperienceSection"));
const EducationSection = lazy(() => import("@/components/sections/EducationSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="animate-pulse bg-muted rounded-lg w-full max-w-4xl h-full mx-auto" />
  </div>
);

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <LazyMotion features={domMax}>
      <div className="relative">
        <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ExperienceSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <EducationSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20 bg-muted animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
};

export default Index;
