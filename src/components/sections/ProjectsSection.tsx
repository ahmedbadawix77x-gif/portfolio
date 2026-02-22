import { m } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight, Layers, Eye } from "lucide-react";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Clean projects data to ensure we have valid items
  const featuredProjects = projects.filter((p) => p.featured);
  
  // Duplicate for infinite scroll
  const scrollingProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects];

  return (
    <section id="projects" className="section-padding bg-gradient-subtle relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-muted/30 via-transparent to-transparent blur-3xl" />

      <div className="container-wide relative z-10 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground bg-muted/30 rounded-full border border-border/30 mb-6">
            <Layers className="w-3.5 h-3.5" />
            Selected Work
          </span>
          <h2 className="heading-lg text-glow mb-4">
            Featured Projects
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            A collection of projects highlighting my work in web development.
          </p>
        </div>
      </div>

      {/* Projects Scroller */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <m.div
            className="flex gap-8 px-4"
            animate={{
                x: ["0%", "-50%"]
            }}
            transition={{
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            }}
            style={{ width: "max-content" }}
        >
          {scrollingProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="group relative w-[450px] flex-shrink-0"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className="relative overflow-hidden rounded-[2rem] bg-gradient-card border border-border/30 h-full card-glow flex flex-col transition-all duration-500 group-hover:border-foreground/20"
              >
                {/* Project Image/Preview Area - Browser Mockup Style */}
                <div className="relative h-64 overflow-hidden bg-muted/10 flex-shrink-0 p-3 pb-0">
                   <div className="w-full h-full rounded-t-2xl overflow-hidden relative border border-border/20 shadow-2xl">
                      {/* Browser Header Mockup */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-muted/30 backdrop-blur-md border-b border-border/10 flex items-center px-3 gap-1.5 z-20">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                      </div>
                      
                      {/* Image */}
                      <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 z-10 text-center">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-foreground/70">Concept</p>
                           <h4 className="text-lg font-bold mb-4">{project.title}</h4>
                           <div className="flex flex-wrap justify-center gap-2">
                              {project.tech.map((t) => (
                                <span key={t} className="text-[10px] px-2 py-1 bg-foreground/10 rounded-md border border-foreground/5">{t}</span>
                              ))}
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-glow-sm group-hover:text-glow transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="body-sm mb-8 line-clamp-2 text-muted-foreground/80 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-foreground text-background rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Live Project
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border/50 rounded-full hover:bg-muted/50 hover:border-foreground/20 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </m.div>
      </div>

      {/* View All Button */}
      <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold border border-border/50 rounded-full hover:bg-muted/30 hover:border-border transition-all duration-500 box-glow-hover"
          >
            All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
      </div>
    </section>
  );
};

export default ProjectsSection;
