/* =====================================================
   MAIN JS – CREATIVE PORTFOLIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     GSAP SETUP
  ===================================================== */
  gsap.registerPlugin(ScrollTrigger);

  /* =====================================================
     1️⃣ CINEMATIC PAGE LOAD
  ===================================================== */
  const introTL = gsap.timeline();

  introTL
    .from(".nav", {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .from(".intro h1", {
      y: 120,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out"
    }, "-=0.6")
    .from(".intro h2, .intro p, .resume-btn", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

  /* =====================================================
     2️⃣ TYPED TEXT (SMOOTH LOOP)
  ===================================================== */
  const roles = [
    "Python Developer",
    "Data Science Engineer",
    "Flask Backend Developer",
    "Machine Learning Engineer"
  ];

  const typed = document.querySelector(".typed-text");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typed) return;

    const word = roles[roleIndex];
    typed.textContent = deleting
      ? word.slice(0, charIndex--)
      : word.slice(0, charIndex++);

    if (!deleting && charIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeLoop, deleting ? 50 : 90);
  }

  typeLoop();

  /* =====================================================
     3️⃣ VIDEO DEPTH PARALLAX
  ===================================================== */
  gsap.utils.toArray(".bg-video").forEach(video => {
    const section = video.closest(".video-section");
    if (!section) return;

    gsap.to(video, {
      scale: 1.15,
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  /* =====================================================
     4️⃣ SECTION WIPE TRANSITION
  ===================================================== */
  gsap.utils.toArray(".video-section").forEach(section => {
    const overlay = section.querySelector(".section-overlay");
    if (!overlay) return;

    gsap.from(overlay, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%"
      }
    });
  });

  /* =====================================================
     5️⃣ WORK GRID – CRAZY STAGGER
  ===================================================== */
  /* =====================================================
   PROJECT CARDS – DEPTH DROP-IN (FUTURISTIC)
===================================================== */

const workSection = document.querySelector("#work");
const cards = gsap.utils.toArray("#work .work-item");

if (workSection && cards.length) {

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      filter: "blur(16px)",
      z: -200,          // 👈 depth
      y: 80,            // slight vertical offset
      rotateX: 18       // subtle 3D tilt
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      z: 0,
      y: 0,
      rotateX: 0,
      duration: 1.6,
      ease: "power4.out",
      stagger: {
        each: 0.12
      },
      scrollTrigger: {
        trigger: workSection,
        start: "top 70%",
        once: true
      }
    }
  );

}


  /* =====================================================
     6️⃣ MAGNETIC HOVER (IMPROVED & SMOOTH)
  ===================================================== */
  document.querySelectorAll(".work-item").forEach(card => {

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        x: x * 0.12,
        y: y * 0.12,
        rotateX: -y * 0.05,
        rotateY: x * 0.05,
        duration: 0.35,
        ease: "power3.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power4.out"
      });
    });

  });

  /* =====================================================
     7️⃣ TEXT SPLIT REVEAL (SAFE)
  ===================================================== */
  document.querySelectorAll(".section-title").forEach(title => {
    const text = title.textContent;
    title.innerHTML = "";

    [...text].forEach(char => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      title.appendChild(span);
    });

    gsap.from(title.querySelectorAll(".char"), {
      y: 80,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 85%"
      }
    });
  });

  /* =====================================================
     8️⃣ VIDEO HOVER PLAY (SAFE)
  ===================================================== */
  document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    card.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  /* =====================================================
   SHOW FLOATING CODING STATS – HOME ONLY (FIXED)
  ===================================================== */

  const floatingStats = document.querySelectorAll(".coding-float");

  if (floatingStats.length) {
    ScrollTrigger.create({
      trigger: ".intro",          // HERO / HOME
      start: "top bottom",        // 👈 start when Home enters view
      end: "bottom bottom",       // 👈 end exactly when Home leaves

      onEnter: () =>
        floatingStats.forEach(el => el.classList.add("show")),

      onEnterBack: () =>
        floatingStats.forEach(el => el.classList.add("show")),

      onLeave: () =>
        floatingStats.forEach(el => el.classList.remove("show")),

      onLeaveBack: () =>
        floatingStats.forEach(el => el.classList.remove("show"))
    });
  }


});

/* =====================================================
   MODAL (ZOOM + FADE)
===================================================== */
function openModal(project) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  if (!modal || !body) return;

  const content = {
    speech: `
      <h2>Speech Emotion Recognition</h2>
      <p>ML audio emotion detection using MFCC & classifiers.</p>
      <a href="https://github.com/VirajThakur03/Speech-Emotion-Recognition-" target="_blank">GitHub</a>
    `,
    bookstore: `
      <h2>Bookstore Management</h2>
      <p>Flask + MySQL CRUD platform.</p>
      <a href="https://github.com/VirajThakur03/Bookstore-Management-" target="_blank">GitHub</a>
    `,
    aim: `
      <h2>Aim Trainer</h2>
      <p>Python reflex & coordination game.</p>
      <a href="https://github.com/VirajThakur03/Aim-Trainer" target="_blank">GitHub</a>
    `,
    nlp: `
      <h2>Password Strength (NLP)</h2>
      <p>NLP-based strength prediction.</p>
      <a href="https://github.com/VirajThakur03/Predict-Password-strength-using-NLP" target="_blank">GitHub</a>
    `,
    currency: `
      <h2>Currency Converter</h2>
      <p>Real-time currency conversion tool.</p>
      <a href="https://github.com/VirajThakur03/Currency-Converter-" target="_blank">GitHub</a>
    `,
    recommender: `
      <h2>Movie Recommender (ML)</h2>
      <p>ML-based movie recommendation system.</p>
      <a href="https://github.com/VirajThakur03/Movie-Recomendation-System" target="_blank">GitHub</a>
    `
  };

  

  body.innerHTML = content[project] || "<p>Project details coming soon.</p>";
  modal.classList.remove("hidden");

  gsap.from(".modal-content", {
    scale: 0.85,
    opacity: 0,
    duration: 0.6,
    ease: "power4.out"
  });
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     SAFETY CHECKS
  ========================== */
  if (!window.THREE) {
    console.error("THREE.js not loaded");
    return;
  }

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  if (!window.gsap || !window.ScrollTrigger) {
  console.error("GSAP or ScrollTrigger not loaded");
  return;
}

gsap.registerPlugin(ScrollTrigger);


  /* ==========================
     BASIC THREE SETUP
  ========================== */
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* ==========================
     CENTER OBJECT
  ========================== */
  const geometry = new THREE.IcosahedronGeometry(1.2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0055,
    wireframe: true
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  /* ==========================
     MOUSE REACTIVE CAMERA
  ========================== */
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollBoost = 0;


  /* ==========================
     ANIMATION LOOP
  ========================== */
  function animate() {

    // base rotation
    mesh.rotation.x += 0.004+ scrollBoost ;
    mesh.rotation.y += 0.006+ scrollBoost ;

    // camera follows mouse (smooth)
    camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
    // velocity-based scroll (positive or negative)
      scrollBoost = self.getVelocity() * 0.00002;
  }
});
  


  scrollBoost *= 2; // smooth decay

  animate();

  /* ==========================
     RESIZE HANDLER
  ========================== */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

});

/* =====================================================
   CAT VISIBILITY + INTERACTION (FINAL STABLE – 3 STATES)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const cat = document.querySelector(".cat");
  const pupils = document.querySelectorAll(".cat .pupil");
  const mouth = document.querySelector(".cat .mouth");
  const targets = document.querySelectorAll("#contact a, #contact b");
  
  if (!cat || !pupils.length || !mouth || !targets.length) return;

  /* ---------------------------------
     INITIAL STATE
  --------------------------------- */
  cat.classList.remove("show");     // hidden before contact
  mouth.classList.add("sad");       // default mood
  mouth.classList.remove("smile", "neutral");

  /* ---------------------------------
     SHOW CAT ON CONTACT (ONCE)
  --------------------------------- */
  ScrollTrigger.create({
  trigger: "#contact",
  start: "top 70%",
  end: "bottom 30%",
  onEnter: () => cat.classList.add("show"),
  onEnterBack: () => cat.classList.add("show"),
  onLeave: () => cat.classList.remove("show"),
  onLeaveBack: () => cat.classList.remove("show")
});


  /* ---------------------------------
     SINGLE MOUSEMOVE HANDLER
  --------------------------------- */
  window.addEventListener("mousemove", (e) => {

    // Only react when cat is visible
    if (!cat.classList.contains("show")) return;

    /* 👀 PUPIL FOLLOW (IRIS FIXED) */
    pupils.forEach(pupil => {
      const eye = pupil.closest(".eye");
      const rect = eye.getBoundingClientRect();

      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;

      const angle = Math.atan2(dy, dx);
      const radius = 4;

      pupil.style.transform =
        `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px,
                                         ${Math.sin(angle) * radius}px)`;
    });

    /* 😿 😐 😊 MOOD LOGIC (3 STATES) */
    let minDist = Infinity;

    targets.forEach(el => {
      const r = el.getBoundingClientRect();
      const dist = Math.hypot(
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2)
      );
      minDist = Math.min(minDist, dist);
    });

    // IMPORTANT: always keep ONE class
    if (minDist < 110) {
      // 😊 Happy
      mouth.classList.add("smile");
      mouth.classList.remove("neutral", "sad");
    } 
    else if (minDist < 220) {
      // 😐 Neutral
      mouth.classList.add("neutral");
      mouth.classList.remove("smile", "sad");
    } 
    else {
      // 😿 Sad
      mouth.classList.add("sad");
      mouth.classList.remove("smile", "neutral");
    }

  });

  /* ---------------------------------
     🐾 PAW WAVE (OPTIONAL: ONLY WHEN HAPPY)
  --------------------------------- */
  targets.forEach(el => {
    el.addEventListener("mouseenter", () => cat.classList.add("wave"));
    el.addEventListener("mouseleave", () => cat.classList.remove("wave"));
  });

  /* ===============================
   CODING PROGRESS LOAD ANIMATION
  ================================ */

  window.addEventListener("load", () => {
    document.querySelectorAll(".coding-chip .bar i").forEach(bar => {
      const p = bar.style.getPropertyValue("--p");
      bar.style.width = "0%";

      setTimeout(() => {
        bar.style.width = `calc(${p} * 1%)`;
      }, 400);
    });
  });

  
});
