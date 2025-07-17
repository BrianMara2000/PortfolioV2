AOS.init({
  startEvent: "DOMContentLoaded",
  once: true,
});

const aosAnimation = document.querySelectorAll(".aos");
observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add("aos-animate");
    } else {
      entry.target.classList.remove("aos-animate");
    }
  });
});
aosAnimation.forEach((aosObject) => {
  observer.observe(aosObject);
});

// Page Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => {
        loader.style.display = "none";
        AOS.refresh(); // ✅ Call after hiding the loader
      }, 500);
    }, 2000);
  } else {
    AOS.refresh(); // Fallback in case loader not found
  }
});

// Smooth scrolling for anchor links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const scrollContainer = document.querySelector(".scroll-container");

scrollContainer.addEventListener("scroll", () => {
  let current = "";
  AOS.refresh();

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollContainer.scrollTop >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const icon = link.querySelector("iconify-icon");
    const defaultIcon = link.getAttribute("data-default-icon");
    const activeIcon = link.getAttribute("data-active-icon");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
      if (icon) icon.setAttribute("icon", activeIcon);
    } else {
      link.classList.remove("active");
      if (icon) icon.setAttribute("icon", defaultIcon);
    }
  });
});

var typingEffect = new Typed(".typed__text", {
  //Typing Effect
  strings: ["Computer Engineer", "Full-stack Developer", "UI/UX Designer"],

  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

//Glowing effect when hover
if (window.innerWidth > 768) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `radial-gradient(
          600px circle at ${x}px ${y}px,
          rgba(165, 113, 255, 0.2),
          transparent 90%
        )`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "var(--card-color)";
    });
  });
}

//Watch demo by opening modal
document.querySelectorAll(".video-trigger").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const videoSrc = this.getAttribute("data-video");
    const orientation = this.getAttribute("data-orientation");
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("videoPlayer");

    video.querySelector("source").setAttribute("src", videoSrc);
    video.load();
    if (orientation === "landscape") {
      modal.style.aspectRatio = "16 / 9";
    } else {
      modal.style.aspectRatio = "9 / 16";
    }
    modal.style.display = "flex";
  });
});

function closeModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("videoPlayer");
  modal.style.display = "none";
  video.pause();
}

// ✅ Close on outside click
window.addEventListener("click", function (e) {
  const modal = document.getElementById("videoModal");
  const content = document.querySelector(".modal-content");
  if (e.target === modal) {
    closeModal();
  }
});
