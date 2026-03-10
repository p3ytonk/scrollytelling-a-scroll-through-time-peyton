const chapterIndicator = document.querySelector(".chapter-indicator");
const chapters = gsap.utils.toArray(".chapter");
const orbs = gsap.utils.toArray(".orb");

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateIndicator = (label) => {
  chapterIndicator.textContent = `Now viewing: ${label}`;
};

if (!prefersReducedMotion) {
  gsap.from(".hero-title span", {
    y: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-subtitle", {
    y: 40,
    opacity: 0,
    delay: 0.5,
    duration: 1,
  });

  orbs.forEach((orb, index) => {
    const drift = 90 + index * 35;

    gsap.to(orb, {
      y: -drift,
      x: index % 2 === 0 ? drift * 0.35 : -drift * 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: "#main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  chapters.forEach((section) => {
    const comic = section.querySelector(".comic");
    const panels = section.querySelectorAll(".panel");
    const progressBar = section.querySelector(".progress-bar");
    const sectionLabel = section.dataset.label || "Chapter";

    gsap.from(comic, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 90,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
    });

    gsap.from(panels, {
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.65,
    });

    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 40%",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateIndicator(sectionLabel),
      onEnterBack: () => updateIndicator(sectionLabel),
    });
  });
} else {
  chapters.forEach((section) => {
    const progressBar = section.querySelector(".progress-bar");
    progressBar.style.width = "100%";
  });
}
