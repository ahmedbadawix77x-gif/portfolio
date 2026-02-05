// API base URL: same origin when served with backend, or set window.API_BASE (e.g. http://localhost:3000)
const API_BASE = typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
  offset: 100,
});

// Splash/Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.transition = "opacity 1.5s cubic-bezier(0.7, 0, 0.3, 1), visibility 1.5s";
      preloader.style.opacity = 0;
      preloader.style.visibility = "hidden";
      setTimeout(() => (preloader.style.display = "none"), 1600);
    }
  }, 2200); // Slightly longer to appreciate the 3D Fakhama
});

// Typing Effect with CV info
const typingTexts = [
  "Ahmed Badawy",
  "Website Creator",
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Passion for Code",
];
let typingIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typingElm = document.querySelector(".typing");
function typeEffect() {
  if (!typingElm) return;
  let current = typingTexts[typingIndex];
  if (!isDeleting) {
    typingElm.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1200);
      return;
    }
  } else {
    typingElm.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 650);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 70);
}
setTimeout(typeEffect, 1100);

// Smooth Scrolling & Active Link Update
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - document.querySelector("nav").offsetHeight,
        behavior: "smooth",
      });
      document
        .querySelectorAll("nav .nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav .nav-link");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Skills Bar Animation with Intersection Observer
document.querySelectorAll(".level-bar").forEach(function (bar) {
  const percent = Number(bar.dataset.percent || 0);
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = percent + "%";
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(bar);
});

// Contact Form – submit to API when available
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const msgEl = contactForm.querySelector(".form-message");
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };
    if (!API_BASE) {
      msgEl.textContent = "Thank you! Your message has been sent.";
      msgEl.style.color = "#4cc9f0";
      contactForm.reset();
      setTimeout(() => (msgEl.textContent = ""), 4200);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        msgEl.textContent = "Thank you! Your message has been sent.";
        msgEl.style.color = "#4cc9f0";
        contactForm.reset();
      } else {
        msgEl.textContent = data.message || "Something went wrong. Try again.";
        msgEl.style.color = "#e74c3c";
      }
    } catch (err) {
      msgEl.textContent = "Network error. Check backend or try again.";
      msgEl.style.color = "#e74c3c";
    }
    setTimeout(() => (msgEl.textContent = ""), 4200);
  });
}

// ✨ 3D Tilt Effect on Hero Image
document.addEventListener("DOMContentLoaded", () => {
  const heroWrapper = document.querySelector(".hero-3d-wrapper");
  if (heroWrapper) {
    heroWrapper.addEventListener("mousemove", (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;
      heroWrapper.querySelector(
        ".hero-img"
      ).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroWrapper.addEventListener("mouseleave", () => {
      heroWrapper.querySelector(".hero-img").style.transform =
        "rotateX(0) rotateY(0) scale3d(1,1,1)";
    });
  }
});

// ✨ Interactive 3D Tilt for Category Titles
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".category-title").forEach(title => {
        const rect = title.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only trigger if mouse is close to the title (within 200px)
        const distance = Math.sqrt(Math.pow(x - rect.width/2, 2) + Math.pow(y - rect.height/2, 2));
        
        if (distance < 250) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            const icon = title.querySelector("i");
            const span = title.querySelector("span");
            
            if(icon) icon.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.1)`;
            if(span) span.style.transform = `perspective(1000px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg) translateZ(30px) translateX(10px)`;
        } else {
            const icon = title.querySelector("i");
            const span = title.querySelector("span");
            if(icon) icon.style.transform = "";
            if(span) span.style.transform = "";
        }
    });
});

// Projects from API (optional – fallback to static HTML)
const VISUAL_CLASSES = ["visual-brazely", "visual-bondok", "visual-flower", "visual-basbosa", "visual-shopery", "visual-default"];
const TECH_ICONS = { react: "fab fa-react", html5: "fab fa-html5", css: "fab fa-css3-alt", js: "fab fa-js", node: "fab fa-node-js", php: "fab fa-php", wordpress: "fab fa-wordpress", sql: "fas fa-database", mongodb: "fab fa-envira" };
function techToIcon(name) {
  const key = (name || "").toLowerCase().replace(/\s+/g, "");
  return TECH_ICONS[key] || "fas fa-code";
}
function buildProjectCard(project, index) {
  const visualClass = VISUAL_CLASSES[index % VISUAL_CLASSES.length];
  const url = project.projectUrl || "#";
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const techHtml = techStack.length
    ? techStack.map((t) => `<i class="${techToIcon(t)}" title="${t}"></i>`).join("")
    : '<i class="fas fa-code"></i>';
  const imgStyle = project.imageUrl ? `background:url(${project.imageUrl}) center/cover;` : "";
  return `
    <div class="project-card compact">
      <a href="${url}" target="_blank" rel="noopener" class="project-image-link">
        <div class="project-visual ${visualClass}" style="${imgStyle}">
          ${!project.imageUrl ? '<i class="fas fa-folder-open"></i>' : ""}
          <div class="image-overlay">
            <i class="fas fa-external-link-alt"></i>
            <span>View Project</span>
          </div>
        </div>
      </a>
      <div class="project-body">
        <h4>${escapeHtml(project.title)}</h4>
        <p>${escapeHtml(project.description || "")}</p>
        <div class="project-tech">${techHtml}</div>
      </div>
    </div>`;
}
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// MARQUEE INFINITE LOOP LOGIC + optional API projects
document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".projects-marquee");
  if (!marquee) return;

  let filledByApi = false;
  async function tryLoadProjects() {
    if (!API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      const json = await res.json();
      if (res.ok && json.success && json.data && json.data.length > 0) {
        marquee.innerHTML = json.data.map((p, i) => buildProjectCard(p, i)).join("");
        filledByApi = true;
        cloneMarqueeContent();
      }
    } catch (_) {}
  }

  function cloneMarqueeContent() {
    const cards = Array.from(marquee.children);
    for (let i = 0; i < 2; i++) {
      cards.forEach((card) => marquee.appendChild(card.cloneNode(true)));
    }
  }

  tryLoadProjects().then(() => {
    if (!filledByApi) cloneMarqueeContent();
  });
});
