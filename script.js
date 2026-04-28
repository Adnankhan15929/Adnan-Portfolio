// ─── THREE.JS BACKGROUND ─────────────────────────────────────────────
(function () {
  const canvas = document.getElementById("bg-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    1000,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 1;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const STAR_COUNT = 2000;
  const positions = new Float32Array(STAR_COUNT * 3);
  const speeds = new Float32Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = Math.random() * -100;
    speeds[i] = 0.05 + Math.random() * 0.25;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const colors = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    if (Math.random() > 0.5) {
      colors[i3] = 0;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    } else {
      colors[i3] = 0.49;
      colors[i3 + 1] = 0.23;
      colors[i3 + 2] = 0.93;
    }
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  scene.fog = new THREE.Fog(0x0a0a0f, 10, 100);

  let mx = 0,
    my = 0,
    tmx = 0,
    tmy = 0;
  window.addEventListener("mousemove", (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      pos[i3 + 2] += speeds[i];
      if (pos[i3 + 2] > 1) {
        pos[i3] = (Math.random() - 0.5) * 20;
        pos[i3 + 1] = (Math.random() - 0.5) * 20;
        pos[i3 + 2] = -100;
      }
    }
    geometry.attributes.position.needsUpdate = true;
    tmx += (mx - tmx) * 0.05;
    tmy += (my - tmy) * 0.05;
    camera.position.x = tmx * 0.5;
    camera.position.y = -tmy * 0.5;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ─── TYPEWRITER ───────────────────────────────────────────────────────
const roles = [
  "Aspiring Developer",
  "Learning by Building",
  "AI/ML Enthusiast",
  "Problem Solver",
];
let ri = 0,
  ci = 0,
  del = false;
const tw = document.getElementById("typewriter");
function type() {
  const cur = roles[ri];
  if (!del) {
    tw.textContent = cur.slice(0, ci + 1);
    ci++;
    if (ci === cur.length) {
      del = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    tw.textContent = cur.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, del ? 60 : 100);
}
type();

// ─── HERO FADE-IN ─────────────────────────────────────────────────────
window.addEventListener("load", () => {
  const hc = document.getElementById("heroContent");
  hc.style.transition = "opacity .9s ease, transform .9s ease";
  hc.style.transform = "translateY(20px)";
  setTimeout(() => {
    hc.style.opacity = "1";
    hc.style.transform = "translateY(0)";
  }, 200);
});

// ─── PROJECTS DATA & RENDER ───────────────────────────────────────────
const projects = [
  {
    num: "01",
    name: "Spotify Clone",
    desc: "A Spotify clone is a music streaming web app inspired by Spotify that lets users browse and play songs. It features playlists, audio controls, and a responsive UI built using HTML and CSS.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/spotifyClone/index.html",
  },
  {
    num: "02",
    name: "Calculator",
    desc: "A calculator is a tool or app used to perform basic mathematical operations like addition, subtraction, multiplication, and division.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/calculator.html",
  },
  {
    num: "03",
    name: "Flipping cards",
    desc: "A flipping card is a UI component that rotates on hover or click to reveal content on its back side.It is commonly built using CSS animations and JavaScript for interactive and engaging designs.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/flipCards.html",
  },
  {
    num: "04",
    name: "Gallery",
    desc: "A gallery is a UI section used to display a collection of images or media in an organized and visually appealing layout. It often includes features like grid view, hover effects, and responsive design for better user interaction.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/gallery.html",
  },
  {
    num: "05",
    name: "Registration Form",
    desc: "A registration form is a UI component that collects user details like name, email, and password to create an account.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/registrationForm.html",
  },
  {
    num: "06",
    name: "Linking sites",
    desc: " connecting multiple web pages using navigation links so users can move smoothly between them. It is typically done using HTML anchor tags (<a>) and helps create a structured, multi-page website experience.",
    tech: ["HTML", "CSS"],
    github: "#",
    live: "projects/registrationAboutHome/home.html",
  },
];
const githubSvg = `<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
const linkSvg = `<svg viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg>`;
const pg = document.getElementById("projectsGrid");
projects.forEach((p) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-num">PROJECT ${p.num}</div>
    <div class="project-name">${p.name}</div>
    <div class="project-desc">${p.desc}</div>
    <div class="project-tech">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
    <div class="project-links">
      
      <a href="${p.live}" class="proj-link">${linkSvg} Live Demo</a>
    </div>`;
  pg.appendChild(card);
});

// ─── GSAP SCROLL ANIMATIONS ───────────────────────────────────────────
(function initGSAP() {
  // Load GSAP + ScrollTrigger from CDN
  const gsapScript = document.createElement("script");
  gsapScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
  gsapScript.onload = loadScrollTrigger;
  document.head.appendChild(gsapScript);

  function loadScrollTrigger() {
    const stScript = document.createElement("script");
    stScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
    stScript.onload = initAnimations;
    document.head.appendChild(stScript);
  }

  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Helper: create a scroll-triggered stagger animation
    function staggerReveal(targets, vars = {}) {
      const els = gsap.utils.toArray(targets);
      if (!els.length) return;
      gsap.fromTo(
        els,
        { opacity: 0, y: vars.y ?? 40, x: vars.x ?? 0, scale: vars.scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: vars.duration ?? 0.75,
          ease: vars.ease ?? "power3.out",
          stagger: vars.stagger ?? 0.18,
          scrollTrigger: {
            trigger: vars.trigger ?? els[0],
            start: vars.start ?? "top 82%",
            toggleActions: "play none none none",
          },
          clearProps: "transform",
        },
      );
    }

    // ── ABOUT section ──
    staggerReveal("#about .section-label", { start: "top 85%" });
    staggerReveal("#about .section-title", {
      start: "top 85%",
      duration: 0.85,
    });
    staggerReveal("#about .section-line", {
      start: "top 85%",
      y: 0,
      scale: 0.5,
      ease: "power2.out",
    });
    staggerReveal("#about .avatar-wrap", {
      x: -60,
      y: 0,
      duration: 1,
      start: "top 80%",
    });
    staggerReveal("#about .bio > p", {
      stagger: 0.22,
      duration: 0.7,
      start: "top 82%",
    });
    staggerReveal("#about .tag", {
      stagger: 0.1,
      y: 20,
      duration: 0.5,
      start: "top 88%",
    });

    // ── SKILLS section ──
    staggerReveal(".skills-header .section-label", {
      trigger: ".skills-section",
      start: "top 83%",
    });
    staggerReveal(".skills-header .section-title", {
      trigger: ".skills-section",
      start: "top 83%",
      duration: 0.85,
    });
    staggerReveal(".skills-header .section-line", {
      trigger: ".skills-section",
      start: "top 83%",
      y: 0,
      scale: 0.4,
    });
    staggerReveal(".skill-card", {
      stagger: 0.15,
      duration: 0.7,
      y: 50,
      trigger: ".skills-grid",
      start: "top 85%",
      ease: "power3.out",
    });

    // ── PROJECTS section ──
    staggerReveal("#projects .section-label", {
      trigger: "#projects",
      start: "top 85%",
    });
    staggerReveal("#projects .section-title", {
      trigger: "#projects",
      start: "top 85%",
      duration: 0.85,
    });
    staggerReveal("#projects .section-line", {
      trigger: "#projects",
      start: "top 85%",
      y: 0,
      scale: 0.4,
    });
    staggerReveal(".project-card", {
      stagger: 0.13,
      duration: 0.75,
      y: 60,
      trigger: ".projects-grid",
      start: "top 82%",
      ease: "power3.out",
    });

    // ── CONTACT section ──
    staggerReveal("#contact .section-label", {
      trigger: "#contact",
      start: "top 85%",
    });
    staggerReveal("#contact .section-title", {
      trigger: "#contact",
      start: "top 85%",
      duration: 0.85,
    });
    staggerReveal("#contact .section-line", {
      trigger: "#contact",
      start: "top 85%",
      y: 0,
      scale: 0.4,
    });
    staggerReveal(".contact-info h3", {
      trigger: ".contact-grid",
      start: "top 82%",
    });
    staggerReveal(".contact-info p", {
      trigger: ".contact-grid",
      start: "top 82%",
      stagger: 0.15,
    });
    staggerReveal(".social-link", {
      trigger: ".social-links",
      start: "top 85%",
      stagger: 0.12,
      x: -20,
      y: 0,
    });
    staggerReveal(".form-group", {
      trigger: ".contact-form",
      start: "top 85%",
      stagger: 0.15,
    });
    staggerReveal(".form-btn", {
      trigger: ".contact-form",
      start: "top 95%",
      y: 20,
      duration: 0.6,
    });

    // ── Mark old .reveal elements as visible (GSAP takes over) ──
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
      el.style.opacity = "";
      el.style.transform = "";
    });
  }
})();

// ─── NAV SCROLL ───────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  document.getElementById("navbar").style.boxShadow =
    window.scrollY > 50 ? "0 4px 30px rgba(0,0,0,.55)" : "none";
});

// ─── MOBILE MENU ──────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
});
document.querySelectorAll(".mob-link").forEach((l) => {
  l.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// ─── CONTACT FORM ─────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".form-btn");
  btn.textContent = "Message Sent! ✓";
  btn.style.background = "#10b981";
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}

// ─── ACTIVE NAV ON SCROLL ─────────────────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const activateLink = () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120)
      current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`)
      link.classList.add("active");
  });
};
window.addEventListener("scroll", activateLink);
activateLink();

// ─── CURSOR GLOW ON CARDS (subtle) ────────────────────────────────────
document.querySelectorAll(".skill-card, .project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});
