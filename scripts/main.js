console.log("main.js loaded");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const heroTl = gsap.timeline();

  heroTl
    .from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.4")
    .from(".hero-meta p", {
      opacity: 0,
      y: 16,
      duration: 0.5,
      stagger: 0.12,
      ease: "power1.out"
    }, "-=0.2");

  const ch1Tl = gsap.timeline({ delay: 0.3 });

  ch1Tl
    .from("#ch1 .chapter-header h2", {
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease: "power2.out"
    })
    .from("#ch1 .chapter-text p", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power1.out"
    }, "-=0.2");

  const ch2Tl = gsap.timeline({ delay: 0.6 });

  ch2Tl
    .from("#ch2 .chapter-header h2", {
      opacity: 0,
      x: 30,
      duration: 0.7,
      ease: "power4.out"
    })
    .from("#ch2 .chapter-kicker", {
      opacity: 0,
      y: 18,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .from("#ch2 .chapter-text p", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "back.out(1.4)"
    }, "-=0.2");

  gsap.from("#ch3 .chapter-header h2", {
    opacity: 0,
    x: -30,
    duration: 0.7,
    delay: 1.1,
    ease: "power2.out"
  });

  gsap.from("#ch3 .chapter-kicker, #ch3 .chapter-text p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1.25,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.from("#ch4 .chapter-header h2", {
    opacity: 0,
    x: 30,
    duration: 0.7,
    delay: 1.6,
    ease: "power3.out"
  });

  gsap.from("#ch4 .chapter-kicker, #ch4 .chapter-text p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1.75,
    stagger: 0.15,
    ease: "power1.out"
  });

  gsap.from("#ch5 .chapter-header h2", {
    opacity: 0,
    x: -30,
    duration: 0.7,
    delay: 2.1,
    ease: "power2.out"
  });

  gsap.from("#ch5 .chapter-kicker, #ch5 .chapter-text p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 2.25,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.from("#ch6 .chapter-header h2", {
    opacity: 0,
    x: 30,
    duration: 0.7,
    delay: 2.6,
    ease: "power4.out"
  });

  gsap.from("#ch6 .chapter-kicker, #ch6 .chapter-text p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 2.75,
    stagger: 0.15,
    ease: "back.out(1.4)"
  });

  gsap.from("#ch7 .chapter-header h2", {
    opacity: 0,
    x: -30,
    duration: 0.7,
    delay: 3.1,
    ease: "power2.out"
  });

  gsap.from("#ch7 .chapter-kicker, #ch7 .chapter-text p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 3.25,
    stagger: 0.15,
    ease: "power1.out"
  });
}
