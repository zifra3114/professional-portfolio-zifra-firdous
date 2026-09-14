// ===================================================
// TYPING ANIMATION — Full Stack Developer heading
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.getElementById("typing-text");
  if (!typingEl) return;

  // Yahan jo words dikhane hain unki list. Chaho to change/add kar sakte ho.
  const words = [
    "Full Stack Developer",
    "Web Developer",
    "App Builder",
    "Problem Solver"
  ];

  const typeSpeed = 90;    // typing speed (ms per letter)
  const eraseSpeed = 45;   // erasing speed (ms per letter)
  const holdTime = 1400;   // pause after word is fully typed (ms)
  const gapTime = 400;     // pause after erasing, before next word (ms)

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // typing forward
      charIndex++;
      typingEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        // full word typed, pause then start deleting
        isDeleting = true;
        setTimeout(tick, holdTime);
        return;
      }

      setTimeout(tick, typeSpeed);
    } else {
      // erasing
      charIndex--;
      typingEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, gapTime);
        return;
      }

      setTimeout(tick, eraseSpeed);
    }
  }

  tick();
});
// ===================================================
// SELECTED WORK — MARQUEE PROJECTS
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  const projects = [

    {
      title: "SupportFlow",
      tech: "React · Node.js · Express · MongoDB",
      github: "#",
      live: "#",
      video: "assets/videos/project-1.mp4"
    },

    {
      title: "DevBlog",
      tech: "MERN Stack · JWT · Cloudinary",
      github: "#",
      live: "#",
      video: "assets/videos/project-2.mp4"
    },

    {
      title: "Complain Portal",
      tech: "React · Node.js · MongoDB",
      github: "#",
      live: "https://complaint-portal-phi.vercel.app/",
      video: "assets/videos/project-3.mp4"
    },

    {
      title: "School Management System",
      tech: "Next.js · Django · PostgreSQL",
      github: "#",
      live: "#",
      video: "assets/videos/project-4.mp4"
    },

    {
      title: "E-Commerce Website",
      tech: "React · Django · PostgreSQL",
      github: "#",
      live: "#",
      video: "assets/videos/project-5.mp4"
    },

    {
      title: "AI Web Application",
      tech: "Next.js · Python · AI",
      github: "#",
      live: "#",
      video: "assets/videos/project-6.mp4"
    }

  ];


  const template = document.getElementById(
    "project-card-template"
  );

  const row1 = document.getElementById("row-1");
  const row2 = document.getElementById("row-2");


  if (!template || !row1 || !row2) return;


  const REPEATS = 6;


  function buildCard(project, displayIndex) {

    const node = template.content.cloneNode(true);

    const thumb = node.querySelector(".project-thumb");

    const video = node.querySelector(".project-video");

    const playBtn = node.querySelector(".play-btn");


    // Number
    node.querySelector(".project-num").textContent =
      String(displayIndex + 1).padStart(2, "0");


    // Project content
    node.querySelector(".project-title").textContent =
      project.title;

    node.querySelector(".project-sub").textContent =
      project.tech;


    // Links
    node.querySelector(".gh-link").href =
      project.github;

    node.querySelector(".live-link").href =
      project.live;


    // ==========================================
    // VIDEO
    // ==========================================

    if (project.video) {

      thumb.classList.add("has-video");

      video.src = project.video;


      // Hover → Play
      thumb.addEventListener("mouseenter", () => {

        video.currentTime = 0;

        video.play().catch(() => {});

      });


      // Mouse leave → Pause
      thumb.addEventListener("mouseleave", () => {

        video.pause();

      });


      // Touch devices
      thumb.addEventListener("click", () => {

        if (video.paused) {

          video.play().catch(() => {});

        } else {

          video.pause();

        }

      });

    }


    return node;
  }


  function fillRow(track, rowProjects) {

    for (let pass = 0; pass < REPEATS; pass++) {

      rowProjects.forEach((entry) => {

        track.appendChild(
          buildCard(entry.project, entry.index)
        );

      });

    }

  }


  // Split projects between rows
  const rowA = [];
  const rowB = [];


  projects.forEach((project, index) => {

    if (index % 2 === 0) {

      rowA.push({
        project,
        index
      });

    } else {

      rowB.push({
        project,
        index
      });

    }

  });


  fillRow(row1, rowA);

  fillRow(row2, rowB);

});

// =========================================================
// SKILLS SECTION
// INTERACTIVE CIRCULAR PERCENTAGE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {


  const orbitSkills =
    document.querySelectorAll(".orbit-skill");


  const skillRows =
    document.querySelectorAll(".skill-row");


  const activeSkill =
    document.getElementById("activeSkill");


  const percentageEl =
    document.getElementById("skillPercentage");


  const progressRing =
    document.querySelector(
      ".progress-ring-fill"
    );


  if (
    !orbitSkills.length ||
    !skillRows.length ||
    !progressRing ||
    !percentageEl
  ) {
    return;
  }



  // =======================================================
  // CIRCLE CALCULATION
  // =======================================================

  const radius = 68;

  const circumference =
    2 * Math.PI * radius;


  progressRing.style.strokeDasharray =
    circumference;


  progressRing.style.strokeDashoffset =
    circumference;



  // =======================================================
  // ANIMATION VARIABLES
  // =======================================================

  let percentageAnimation;


  let currentPercentage = 0;



  // =======================================================
  // ANIMATE NUMBER
  // =======================================================

  function animateNumber(target) {


    cancelAnimationFrame(
      percentageAnimation
    );


    const start =
      currentPercentage;


    const difference =
      target - start;


    const duration = 900;


    const startTime =
      performance.now();



    function animate(time) {


      const elapsed =
        time - startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      // Smooth ease-out

      const eased =
        1 -
        Math.pow(
          1 - progress,
          4
        );


      const value =
        Math.round(
          start +
          difference * eased
        );


      percentageEl.textContent =
        value;


      if (progress < 1) {

        percentageAnimation =
          requestAnimationFrame(
            animate
          );

      } else {

        currentPercentage =
          target;

      }

    }


    percentageAnimation =
      requestAnimationFrame(
        animate
      );

  }



  // =======================================================
  // UPDATE CIRCLE
  // =======================================================

  function updateCircle(level) {


    const percentage =
      Number(level);


    const offset =
      circumference -
      (
        percentage / 100
      ) *
      circumference;


    progressRing.style.strokeDashoffset =
      offset;


    animateNumber(
      percentage
    );

  }



  // =======================================================
  // ACTIVATE SKILL
  // =======================================================

  function activateSkill(
    skillName,
    level
  ) {


    // Center title

    activeSkill.textContent =
      skillName;



    // Orbit active state

    orbitSkills.forEach(
      skill => {

        skill.classList.toggle(
          "active",

          skill.dataset.skill ===
          skillName
        );

      }
    );



    // List active state

    skillRows.forEach(
      row => {

        row.classList.toggle(
          "active",

          row.dataset.skill ===
          skillName
        );

      }
    );



    // Circular percentage

    updateCircle(
      level
    );

  }



  // =======================================================
  // ORBIT SKILL EVENTS
  // =======================================================

  orbitSkills.forEach(
    skill => {


      skill.addEventListener(
        "mouseenter",
        () => {

          activateSkill(
            skill.dataset.skill,
            skill.dataset.level
          );

        }
      );



      skill.addEventListener(
        "click",
        () => {

          activateSkill(
            skill.dataset.skill,
            skill.dataset.level
          );

        }
      );

    }
  );



  // =======================================================
  // RIGHT LIST EVENTS
  // =======================================================

  skillRows.forEach(
    row => {


      row.addEventListener(
        "mouseenter",
        () => {

          activateSkill(
            row.dataset.skill,
            row.dataset.level
          );

        }
      );



      row.addEventListener(
        "click",
        () => {

          activateSkill(
            row.dataset.skill,
            row.dataset.level
          );

        }
      );

    }
  );



  // =======================================================
  // INITIAL ANIMATION
  // =======================================================

  setTimeout(
    () => {

      activateSkill(
        "React.js",
        90
      );

    },
    500
  );


});
