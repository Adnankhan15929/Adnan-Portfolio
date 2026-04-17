 // ─── THREE.JS BACKGROUND ───────────────────────────────────────────────
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
        const WARP_SPEED = 0.15;

        // Starfield
        const STAR_COUNT = 2000;
        const positions = new Float32Array(STAR_COUNT * 3);
        const speeds = new Float32Array(STAR_COUNT);

        for (let i = 0; i < STAR_COUNT; i++) {
          const i3 = i * 3;

          positions[i3] = (Math.random() - 0.5) * 20; // x
          positions[i3 + 1] = (Math.random() - 0.5) * 20; // y
          positions[i3 + 2] = Math.random() * -100; // z (deep space)

          speeds[i] = 0.05 + Math.random() * 0.25;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );

        const colors = new Float32Array(STAR_COUNT * 3);

        for (let i = 0; i < STAR_COUNT; i++) {
          const i3 = i * 3;

          if (Math.random() > 0.5) {
            // cyan
            colors[i3] = 0;
            colors[i3 + 1] = 1;
            colors[i3 + 2] = 1;
          } else {
            // purple
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

        // Mouse control
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

            // Move stars toward camera (warp effect)
            pos[i3 + 2] += speeds[i];

            // Reset star when it passes camera
            if (pos[i3 + 2] > 1) {
              pos[i3] = (Math.random() - 0.5) * 20;
              pos[i3 + 1] = (Math.random() - 0.5) * 20;
              pos[i3 + 2] = -100;
            }
          }

          geometry.attributes.position.needsUpdate = true;

          // Smooth parallax
          tmx += (mx - tmx) * 0.05;
          tmy += (my - tmy) * 0.05;

          camera.position.x = tmx * 0.5;
          camera.position.y = -tmy * 0.5;

          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.4;
        }
        scene.fog = new THREE.Fog(0x0a0a0f, 10, 100);

        animate();

        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      })();

      // ─── TYPEWRITER ─────────────────────────────────────────────────────────
    const roles = [
  "Full Stack Developer",
  "AI/ML Explorer",
  "Building Smart Web Apps",
  "DSA & Problem Solver"
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

      // ─── HERO FADE-IN ───────────────────────────────────────────────────────
      window.addEventListener("load", () => {
        const hc = document.getElementById("heroContent");
        hc.style.transition = "opacity .9s ease, transform .9s ease";
        hc.style.transform = "translateY(20px)";
        setTimeout(() => {
          hc.style.opacity = "1";
          hc.style.transform = "translateY(0)";
        }, 200);
      });

      // ─── SKILLS DATA & RENDER ───────────────────────────────────────────────
    //   const skills = [
    //     { icon: "⚛", name: "React / Next.js", pct: 92 },
    //     { icon: "🟨", name: "JavaScript / TypeScript", pct: 95 },
    //     { icon: "🐍", name: "Python", pct: 78 },
    //     { icon: "🟢", name: "Node.js / Express", pct: 88 },
    //     { icon: "🎨", name: "CSS / Tailwind", pct: 90 },
    //     { icon: "🗄", name: "PostgreSQL / MongoDB", pct: 82 },
    //     { icon: "🐳", name: "Docker / DevOps", pct: 70 },
    //     { icon: "☁", name: "AWS / Cloud", pct: 72 },
    //     { icon: "🔗", name: "GraphQL / REST APIs", pct: 86 },
    //   ];
    //   const sg = document.getElementById("skillsGrid");
    //   skills.forEach((s) => {
    //     const card = document.createElement("div");
    //     card.className = "skill-card reveal";
    //     card.innerHTML = `
    // <div class="skill-header">
    //   <div class="skill-name"><span class="skill-icon">${s.icon}</span>${s.name}</div>
    //   <span class="skill-pct">${s.pct}%</span>
    // </div>
    // <div class="progress-track"><div class="progress-fill" data-pct="${s.pct}"></div></div>`;
    //     sg.appendChild(card);
    //   });

      // ─── PROJECTS DATA & RENDER ─────────────────────────────────────────────
      const projects = [
        {
          num: "01",
          name: "NebulaOS Dashboard",
          desc: "A real-time cloud infrastructure monitoring platform with live metrics, alerting, and multi-tenant support for enterprise clients.",
          tech: ["React", "TypeScript", "WebSockets", "D3.js", "Node.js"],
          github: "#",
          live: "#",
        },
        {
          num: "02",
          name: "Verse — AI Writing App",
          desc: "LLM-powered writing assistant with context-aware suggestions, version history, and team collaboration features built on Next.js 14.",
          tech: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind"],
          github: "#",
          live: "#",
        },
        {
          num: "03",
          name: "CryptoTracker Pro",
          desc: "Cryptocurrency portfolio tracker with real-time price updates, P&L analytics, tax reports, and mobile-first PWA architecture.",
          tech: ["Vue 3", "Python", "FastAPI", "Redis", "Chart.js"],
          github: "#",
          live: "#",
        },
        {
          num: "04",
          name: "DevCollab",
          desc: "Open-source developer collaboration platform — think GitHub meets Notion. Features code review, docs, and project management.",
          tech: ["React", "GraphQL", "MongoDB", "Docker", "AWS"],
          github: "#",
          live: "#",
        },
        {
          num: "05",
          name: "Aether UI Kit",
          desc: "A 200+ component design system and Figma library used by 3,000+ developers. Full dark mode, accessibility WCAG 2.1 AA compliant.",
          tech: ["TypeScript", "Storybook", "Radix UI", "CSS Modules"],
          github: "#",
          live: "#",
        },
        {
          num: "06",
          name: "PulseAPI Gateway",
          desc: "High-performance API gateway with rate limiting, JWT auth, analytics dashboard, and one-click Kubernetes deployment.",
          tech: ["Go", "Nginx", "Redis", "Kubernetes", "Prometheus"],
          github: "#",
          live: "#",
        },
      ];
      const pg = document.getElementById("projectsGrid");
      const githubSvg = `<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
      const linkSvg = `<svg viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg>`;
      projects.forEach((p) => {
        const card = document.createElement("div");
        card.className = "project-card reveal";
        card.innerHTML = `
    <div class="project-num">PROJECT ${p.num}</div>
    <div class="project-name">${p.name}</div>
    <div class="project-desc">${p.desc}</div>
    <div class="project-tech">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
    <div class="project-links">
      <a href="${p.github}" class="proj-link">${githubSvg} GitHub</a>
      <a href="${p.live}" class="proj-link">${linkSvg} Live Demo</a>
    </div>`;
        pg.appendChild(card);
      });

      // ─── SCROLL REVEAL ───────────────────────────────────────────────────────
      const revealEls = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("visible"), idx * 80);
              // Animate progress bars when skills visible
              const fills = entry.target.querySelectorAll(".progress-fill");
              fills.forEach((f) => {
                f.style.width = f.dataset.pct + "%";
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealEls.forEach((el) => observer.observe(el));

      // ─── NAV SCROLL ──────────────────────────────────────────────────────────
      window.addEventListener("scroll", () => {
        document.getElementById("navbar").style.boxShadow =
          window.scrollY > 50 ? "0 4px 30px rgba(0,0,0,.5)" : "none";
      });

      // ─── MOBILE MENU ─────────────────────────────────────────────────────────
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      hamburger.addEventListener("click", () =>
        mobileMenu.classList.toggle("open"),
      );
      document.querySelectorAll(".mob-link").forEach((l) => {
        l.addEventListener("click", () => mobileMenu.classList.remove("open"));
      });

      // ─── FORM ────────────────────────────────────────────────────────────────
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

      // ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateLink = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateLink);
activateLink(); // run on load