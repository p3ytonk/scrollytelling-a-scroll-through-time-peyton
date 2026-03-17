const chapterIndicator = document.querySelector(".chapter-indicator");
const storySections = gsap.utils.toArray("main section");
const chapters = gsap.utils.toArray(".chapter");
const progressBars = gsap.utils.toArray(".progress-bar");
const orbs = gsap.utils.toArray(".orb");
const liquidGradientRoot = document.querySelector("#liquid-gradient");
const heroTitle = document.querySelector(".hero-title");
const heroTitleLines = gsap.utils.toArray(".hero-title-line");
const themeToggle = document.querySelector(".theme-toggle");
const finalChapter = chapters[chapters.length - 1] || null;
const finalProgressBar = progressBars[progressBars.length - 1] || null;
const finalComic = finalChapter?.querySelector(".comic") || null;
const finalProgressTrack = finalChapter?.querySelector(".progress") || null;
const standardProgressBars = finalProgressBar ? progressBars.slice(0, -1) : progressBars;

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let confettiLayer = null;
let finaleTimeline = null;

const applyTheme = (theme) => {
  const nextTheme = theme === "dark" ? "dark" : "light";

  document.body.dataset.theme = nextTheme;

  if (themeToggle) {
    const isDark = nextTheme === "dark";
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
};

const initThemeToggle = () => {
  const savedTheme = window.localStorage.getItem("theme-preference");
  applyTheme(savedTheme || "light");

  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem("theme-preference", nextTheme);
  });
};

const updateIndicator = (label) => {
  chapterIndicator.textContent = `Now viewing: ${label}`;
};

const updateStoryProgress = () => {
  const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
  const progress = maxScroll <= 0 ? 0 : gsap.utils.clamp(0, 1, window.scrollX / maxScroll);

  if (standardProgressBars.length) {
    gsap.set(standardProgressBars, {
      scaleX: progress,
    });
  }

  if (finalProgressBar && !finaleTimeline?.scrollTrigger?.isActive) {
    gsap.set(finalProgressBar, {
      scaleX: progress,
    });
  }
};

const getConfettiLayer = () => {
  if (confettiLayer) {
    return confettiLayer;
  }

  confettiLayer = document.createElement("div");
  confettiLayer.className = "confetti-layer";
  confettiLayer.setAttribute("aria-hidden", "true");
  document.body.appendChild(confettiLayer);
  return confettiLayer;
};

const clearConfetti = () => {
  if (!confettiLayer) {
    return;
  }

  gsap.killTweensOf(confettiLayer.children);
  confettiLayer.replaceChildren();
};

const buildFinaleTimeline = () => {
  if (!finalProgressBar || !finalProgressTrack) {
    return null;
  }

  const timeline = gsap.timeline({ paused: true });

  gsap.set(finalProgressBar, {
    transformOrigin: "left center",
  });

  timeline.to(finalProgressBar, {
    scaleX: 1,
    ease: "none",
    duration: 0.24,
  }, 0);

  timeline.to(finalProgressTrack, {
    boxShadow: "0 0 0 2px rgba(246, 244, 210, 0.18) inset, 0 0 28px rgba(241, 156, 121, 0.55)",
    ease: "none",
    duration: 0.04,
  }, 0.24);

  timeline.to(finalProgressTrack, {
    keyframes: [
      { x: -6, rotate: -1, duration: 0.025 },
      { x: 6, rotate: 1, duration: 0.025 },
      { x: -5, rotate: -0.8, duration: 0.025 },
      { x: 5, rotate: 0.8, duration: 0.025 },
      { x: -2, rotate: -0.3, duration: 0.02 },
      { x: 0, rotate: 0, duration: 0.03 },
    ],
    ease: "none",
  }, 0.27);

  if (prefersReducedMotion) {
    return timeline;
  }

  const layer = getConfettiLayer();
  const colors = ["#f29b74", "#d4e09b", "#f6f4d2", "#ab4e41", "#cbdfbd"];
  const pieceCount = 200;

  clearConfetti();

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    const depth = Math.random();
    const size = depth > 0.82
      ? gsap.utils.random(24, 38, 1)
      : depth > 0.42
        ? gsap.utils.random(14, 24, 1)
        : gsap.utils.random(8, 14, 1);
    const startX = gsap.utils.random(0, window.innerWidth);
    const startY = gsap.utils.random(-window.innerHeight * 0.45, -20);
    const driftX = gsap.utils.random(-280, 280) * (0.65 + depth * 0.75);
    const endY = window.innerHeight + gsap.utils.random(180, 420);
    const startAt = gsap.utils.random(0.3, 0.52);
    const fadeOutAt = gsap.utils.random(0.84, 0.98);
    const midXOne = startX + driftX * 0.2;
    const midXTwo = startX + driftX * 0.58;
    const endX = startX + driftX;
    const targetOpacity = 0.45 + depth * 0.55;
    const startRotation = gsap.utils.random(-180, 180);
    const endRotation = startRotation + gsap.utils.random(360, 1080);
    const scale = 0.72 + depth * 0.7;

    piece.className = "confetti-piece";
    piece.style.width = `${size}px`;
    piece.style.height = `${Math.max(6, size * gsap.utils.random(0.5, 1.4))}px`;
    piece.style.background = colors[index % colors.length];
    piece.style.borderRadius = `${gsap.utils.random(1, 4, 1)}px`;
    layer.appendChild(piece);

    timeline.set(piece, {
      x: startX,
      y: startY,
      rotation: startRotation,
      scale,
      opacity: 0,
    }, 0);

    timeline.to(piece, {
      opacity: targetOpacity,
      ease: "none",
      duration: 0.03,
    }, startAt);

    timeline.to(piece, {
      keyframes: [
        { x: midXOne, y: startY + (endY - startY) * 0.22 },
        { x: midXTwo, y: startY + (endY - startY) * 0.58 },
        { x: endX, y: endY },
      ],
      rotation: endRotation,
      ease: "none",
      duration: 1 - startAt,
    }, startAt);

    timeline.to(piece, {
      opacity: 0,
      ease: "none",
      duration: 0.08,
    }, fadeOutAt);
  }

  return timeline;
};

const splitHeroTitle = () => {
  if (!heroTitle) {
    return [];
  }

  const letters = [];

  heroTitleLines.forEach((line, lineIndex) => {
    const text = (line.dataset.text || line.textContent || "").trim();

    if (!text || line.querySelector(".hero-letter")) {
      line.dataset.lineIndex = String(lineIndex);
      return;
    }

    line.textContent = "";
    line.dataset.lineIndex = String(lineIndex);
    line.setAttribute("aria-hidden", "true");

    [...text].forEach((character, characterIndex) => {
      const letter = document.createElement("span");
      const isSpace = character === " ";

      letter.className = isSpace ? "hero-letter hero-letter-space" : "hero-letter";
      letter.textContent = isSpace ? "\u00A0" : character;
      letter.dataset.lineIndex = String(lineIndex);
      letter.dataset.letterIndex = String(characterIndex);
      line.appendChild(letter);
      letters.push(letter);
    });
  });

  heroTitle.setAttribute(
    "aria-label",
    heroTitleLines
      .map((line) => line.dataset.text || line.textContent || "")
      .join(" ")
      .trim()
  );

  return letters;
};

const getLetterScatter = (letter) => {
  const letterRect = letter.getBoundingClientRect();
  const line = letter.closest(".hero-title-line");

  if (!line) {
    return { x: 0, y: 0, rotate: 0 };
  }

  const lineRect = line.getBoundingClientRect();
  const lineIndex = Number(line.dataset.lineIndex || 0);
  const letterIndex = Number(letter.dataset.letterIndex || 0);
  const letterCenter = letterRect.left + letterRect.width / 2;
  const lineCenter = lineRect.left + lineRect.width / 2;
  const distanceFromCenter = letterCenter - lineCenter;
  const direction = distanceFromCenter === 0 ? (letterIndex % 2 === 0 ? -1 : 1) : Math.sign(distanceFromCenter);
  const spread = Math.abs(distanceFromCenter) * 0.65 + 36 + (letterIndex % 3) * 10;

  return {
    x: direction * spread,
    y: (lineIndex === 0 ? -1 : 1) * (18 + (letterIndex % 4) * 8),
    rotate: direction * (5 + (letterIndex % 5) * 1.8),
  };
};

const initHeroTitleAnimation = () => {
  const heroLetters = splitHeroTitle();

  if (!heroLetters.length || prefersReducedMotion) {
    return;
  }

  gsap.set(heroLetters, {
    display: "inline-block",
    willChange: "transform, opacity",
  });

  gsap.from(heroLetters, {
    xPercent: -18,
    yPercent: 120,
    opacity: 0,
    rotate: -6,
    stagger: {
      each: 0.035,
      from: "start",
    },
    duration: 0.95,
    ease: "power3.out",
  });

  gsap.from(".hero-subtitle", {
    y: 40,
    opacity: 0,
    delay: 0.45,
    duration: 1,
  });

  gsap.to(heroLetters, {
    x: (_, letter) => getLetterScatter(letter).x,
    y: (_, letter) => getLetterScatter(letter).y,
    rotate: (_, letter) => getLetterScatter(letter).rotate,
    opacity: (_, letter) => (letter.classList.contains("hero-letter-space") ? 1 : 0.68),
    ease: "none",
    stagger: {
      each: 0.01,
      from: "center",
    },
    scrollTrigger: {
      trigger: "#hero",
      horizontal: true,
      start: "left left",
      end: "right left",
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
};

const installHorizontalWheelScroll = () => {
  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  let targetScroll = window.scrollX;
  let currentScroll = window.scrollX;
  let rafId = 0;

  const clampTarget = (value) => {
    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    return gsap.utils.clamp(0, Math.max(0, maxScroll), value);
  };

  const animateScroll = () => {
    currentScroll += (targetScroll - currentScroll) * 0.14;

    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
    }

    window.scrollTo({
      left: currentScroll,
      behavior: "auto",
    });

    if (Math.abs(targetScroll - currentScroll) >= 0.5) {
      rafId = window.requestAnimationFrame(animateScroll);
      return;
    }

    rafId = 0;
  };

  const queueScroll = (delta) => {
    targetScroll = clampTarget(targetScroll + delta);

    if (!rafId) {
      rafId = window.requestAnimationFrame(animateScroll);
    }
  };

  window.addEventListener("scroll", () => {
    if (rafId) {
      return;
    }

    currentScroll = window.scrollX;
    targetScroll = window.scrollX;
  });

  window.addEventListener("resize", () => {
    currentScroll = clampTarget(currentScroll);
    targetScroll = clampTarget(targetScroll);
  });

  window.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const maxScroll = document.documentElement.scrollWidth - window.innerWidth;

      if (maxScroll <= 0) {
        return;
      }

      event.preventDefault();
      queueScroll(event.deltaY);
    },
    { passive: false }
  );
};

class TouchTexture {
  constructor(size = 128) {
    this.size = size;
    this.maxAge = 64;
    this.radius = 0.14;
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.context = this.canvas.getContext("2d");
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.trail = [];
    this.clear();
  }

  clear() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.size, this.size);
  }

  addTouch(point) {
    const last = this.trail[0];
    let velocity = 0;

    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 7.5, 1);
    }

    this.trail.unshift({
      x: point.x,
      y: point.y,
      age: 0,
      force: Math.max(0.18, velocity),
    });
  }

  drawPoint(point) {
    const intensity = 1 - point.age / this.maxAge;

    if (intensity <= 0) {
      return;
    }

    const canvasX = point.x * this.size;
    const canvasY = (1 - point.y) * this.size;
    const radius = this.size * this.radius * (0.65 + point.force * 0.6);
    const gradient = this.context.createRadialGradient(
      canvasX,
      canvasY,
      radius * 0.1,
      canvasX,
      canvasY,
      radius
    );

    gradient.addColorStop(0, `rgba(120, 120, 120, ${intensity * 0.24})`);
    gradient.addColorStop(0.45, `rgba(70, 70, 70, ${intensity * 0.12})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.context.beginPath();
    this.context.fillStyle = gradient;
    this.context.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
    this.context.fill();
  }

  update() {
    this.clear();
    this.trail = this.trail.filter((point) => point.age <= this.maxAge);

    for (const point of this.trail) {
      this.drawPoint(point);
      point.age += 1;
    }

    this.texture.needsUpdate = true;
  }
}

const initLiquidGradient = () => {
  if (!liquidGradientRoot || prefersReducedMotion || typeof THREE === "undefined") {
    return null;
  }

  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.domElement.setAttribute("aria-hidden", "true");
  liquidGradientRoot.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const touchTexture = new TouchTexture(128);
  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_hover: { value: 0 },
    u_touch: { value: touchTexture.texture },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_hover;
      uniform sampler2D u_touch;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;

        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.02;
          amplitude *= 0.5;
        }

        return value;
      }

      void main() {
        vec2 uv = vUv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 centered = (uv - 0.5) * aspect;
        vec2 mouse = (u_mouse - 0.5) * aspect;
        vec2 toMouse = centered - mouse;
        float distToMouse = length(centered - mouse);
        float hoverInfluence = smoothstep(0.9, 0.0, distToMouse) * u_hover;

        vec4 touch = texture2D(u_touch, uv);
        float ripple = touch.r;

        vec2 flow = centered;
        flow.x += 0.25 * sin(flow.y * 3.1 + u_time * 0.28);
        flow.y += 0.18 * cos(flow.x * 3.7 - u_time * 0.24);

        float fieldA = fbm(flow * 2.0 + vec2(u_time * 0.08, -u_time * 0.05));
        float fieldB = fbm(flow * 3.4 - vec2(u_time * 0.06, u_time * 0.09));
        float fieldC = fbm(flow * 4.2 + vec2(-u_time * 0.05, u_time * 0.04));

        vec2 distortion = vec2(
          fieldA - fieldB,
          fieldC - fieldA
        );
        vec2 flowDirection = normalize(distortion + vec2(0.0001));
        vec2 cursorDirection = normalize(toMouse + vec2(0.0001));
        vec2 swirlDirection = vec2(-cursorDirection.y, cursorDirection.x);
        float cursorPressure = hoverInfluence * (0.9 + ripple * 1.9);

        uv += distortion * 0.08;
        uv += cursorDirection * (-0.085 * cursorPressure);
        uv += swirlDirection * sin(distToMouse * 24.0 - u_time * 1.4) * (0.008 * cursorPressure);
        uv += flowDirection * (0.055 * ripple);
        uv += distortion * (ripple * 0.26 + hoverInfluence * 0.14);

        float swirl = fbm(uv * 5.4 + vec2(u_time * 0.1, -u_time * 0.08));
        float highlight = smoothstep(0.48, 0.92, fieldB + swirl * 0.38);

        vec3 deep = vec3(0.12, 0.07, 0.06);
        vec3 clay = vec3(0.643, 0.29, 0.247);
        vec3 sage = vec3(0.831, 0.878, 0.608);
        vec3 peach = vec3(0.945, 0.612, 0.475);
        vec3 haze = vec3(0.992, 0.965, 0.88);

        vec3 color = deep;
        color = mix(color, clay, smoothstep(0.16, 0.82, fieldA));
        color = mix(color, sage, smoothstep(0.26, 0.88, fieldB));
        color = mix(color, peach, smoothstep(0.38, 0.95, fieldC));
        color += haze * highlight * 0.28;

        float vignette = smoothstep(1.28, 0.18, length(centered));
        color *= 0.72 + vignette * 0.52;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const resize = () => {
    const { width, height } = liquidGradientRoot.getBoundingClientRect();

    renderer.setSize(width, height, false);
    uniforms.u_resolution.value.set(width, height);
  };

  const pointer = new THREE.Vector2(0.5, 0.5);

  const movePointer = (event) => {
    const rect = liquidGradientRoot.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;

    pointer.set(gsap.utils.clamp(0, 1, x), gsap.utils.clamp(0, 1, y));
    touchTexture.addTouch(pointer);
    gsap.to(uniforms.u_hover, {
      value: 1,
      duration: 0.45,
      overwrite: true,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(uniforms.u_hover, {
      value: 0,
      duration: 0.8,
      overwrite: true,
      ease: "power2.out",
    });
  };

  window.addEventListener("pointermove", movePointer);
  document.addEventListener("pointerleave", onLeave);
  window.addEventListener("resize", resize);

  let frameId = 0;

  const render = () => {
    uniforms.u_time.value += 0.01;
    uniforms.u_mouse.value.lerp(pointer, 0.085);
    touchTexture.update();
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  resize();
  document.body.classList.add("liquid-gradient-ready");
  render();

  return () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("pointermove", movePointer);
    document.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("resize", resize);
    material.dispose();
    mesh.geometry.dispose();
    touchTexture.texture.dispose();
    renderer.dispose();
  };
};

initLiquidGradient();
installHorizontalWheelScroll();
initHeroTitleAnimation();
initThemeToggle();

if (!prefersReducedMotion) {
  orbs.forEach((orb, index) => {
    const drift = 90 + index * 35;

    gsap.to(orb, {
      x: index % 2 === 0 ? drift : -drift,
      y: index % 2 === 0 ? -drift * 0.18 : drift * 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: "#main",
        horizontal: true,
        start: "left left",
        end: "right right",
        scrub: true,
      },
    });
  });

  chapters.forEach((section) => {
    const comic = section.querySelector(".comic");
    const panels = section.querySelectorAll(".panel");

    gsap.from(comic, {
      scrollTrigger: {
        trigger: section,
        horizontal: true,
        start: "left 80%",
      },
      x: 90,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      immediateRender: false,
    });

    gsap.from(panels, {
      scrollTrigger: {
        trigger: section,
        horizontal: true,
        start: "left 78%",
      },
      opacity: 0,
      x: 30,
      stagger: 0.12,
      duration: 0.65,
      immediateRender: false,
    });
  });
}

updateStoryProgress();
window.addEventListener("scroll", updateStoryProgress, { passive: true });
window.addEventListener("resize", updateStoryProgress);

if (finalChapter && finalProgressBar) {
  finaleTimeline = buildFinaleTimeline();

  ScrollTrigger.create({
    trigger: finalProgressTrack || finalComic || finalChapter,
    horizontal: true,
    start: "left 92%",
    end: "right 48%",
    scrub: 1.1,
    animation: finaleTimeline,
    invalidateOnRefresh: true,
    onLeaveBack: () => {
      if (finalProgressTrack) {
        gsap.set(finalProgressTrack, {
          x: 0,
          rotate: 0,
          clearProps: "boxShadow",
        });
      }

      updateStoryProgress();
    },
  });
}

storySections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    horizontal: true,
    start: "left center",
    end: "right center",
    onEnter: () => updateIndicator(section.dataset.label || "Chapter"),
    onEnterBack: () => updateIndicator(section.dataset.label || "Chapter"),
  });
});
