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
    document.getElementById("preloader").style.opacity = 0;
    setTimeout(
      () => (document.getElementById("preloader").style.display = "none"),
      900
    );
  }, 1650);
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

// Contact Form
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = contactForm.querySelector(".form-message");
    msg.textContent = "Thank you! Your message has been sent.";
    msg.style.color = "#4cc9f0";
    setTimeout(() => {
      msg.textContent = "";
    }, 4200);
    contactForm.reset();
  });
}

// Project Image Link Click (Optional - can be removed if not needed)
document.querySelectorAll(".project-image").forEach((img) => {
  img.addEventListener("click", function (e) {
    const link = this.querySelector("a");
    if (link) {
      e.preventDefault();
      window.open(link.href, "_blank");
    }
  });
});

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

// MARQUEE INFINITE LOOP LOGIC
document.addEventListener("DOMContentLoaded", () => {
    const marquee = document.querySelector(".projects-marquee");
    if (marquee) {
        // Clone the content multiple times to ensure it covers even ultra-wide screens
        const cards = Array.from(marquee.children);
        
        // Clone twice (Total 3 sets) to ensure zero gaps on reset
        for (let i = 0; i < 2; i++) {
            cards.forEach((card) => {
                const clone = card.cloneNode(true);
                marquee.appendChild(clone);
            });
        }
    }
});
