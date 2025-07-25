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

//Contact form using EmailJS
const serviceID = emailConfig.serviceID;
const templateID = emailConfig.templateID;
const publicKey = emailConfig.publicKey;

emailjs.init({ publicKey });

const btn = document.getElementById("sendBtn");
const btnLabel = btn.querySelector(".btn-label");
const btnSpinner = document.getElementById("btnSpinner");
const closeNotif = document.querySelector(".close-notif");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    btnLabel.style.display = "none";
    btnSpinner.style.display = "flex";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const status = document.getElementById("formStatus");
    const statusMessage = document.getElementById("status-message");
    const icon = document.querySelector(".status-icon");

    if (!name || !email || !message) {
      btnLabel.style.display = "flex";
      btnSpinner.style.display = "none";

      status.style.display = "flex";
      status.style.backgroundColor = "#CB3A3A";
      statusMessage.textContent = "All fields are required.";
      icon.setAttribute("icon", "mdi:error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      btnLabel.style.display = "flex";
      btnSpinner.style.display = "none";

      status.style.display = "flex";
      status.style.backgroundColor = "#CB3A3A";

      statusMessage.textContent = "Enter a valid email address.";
      icon.setAttribute("icon", "mdi:error");
      return;
    }

    emailjs.sendForm(serviceID, templateID, "#contact-form").then(
      () => {
        btnLabel.style.display = "flex";
        btnSpinner.style.display = "none";

        status.style.display = "flex";
        statusMessage.innerText = "Message sent!";
        icon.setAttribute("icon", "gg:check-o");
        status.style.backgroundColor = "green";

        document.getElementById("contact-form").reset();
      },
      (error) => {
        btnLabel.style.display = "flex";
        btnSpinner.style.display = "none";

        icon.setAttribute("icon", "mdi:error");
        status.style.backgroundColor = "#CB3A3A";

        statusMessage.innerText = "Failed to send. Try again.";
        console.error(error);
      }
    );
  });

closeNotif.addEventListener("click", () => {
  document.getElementById("formStatus").style.display = "none";
});

// Project tabs functionality
const tabSoft = document.querySelector("#tab1");
const tabHard = document.querySelector("#tab2");
const softwareContainer = document.querySelector(".software-container");
const hardwareContainer = document.querySelector(".hardware-container");

function updateTabs() {
  if (tabSoft.checked) {
    softwareContainer.style.display = "grid";
    hardwareContainer.style.display = "none";
  } else if (tabHard.checked) {
    softwareContainer.style.display = "none";
    hardwareContainer.style.display = "grid";
  }
}

tabSoft.addEventListener("change", updateTabs);
tabHard.addEventListener("change", updateTabs);

updateTabs();

//Glowing effect when hover
const cards = document.querySelectorAll(".project-card");
const wrappers = document.querySelectorAll(".project-content");

wrappers.forEach((wrapper) => {
  wrapper.addEventListener("mousemove", function ($event) {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = $event.clientX - rect.left;
      const y = $event.clientY - rect.top;

      card.style.setProperty("--xPos", `${x}px`);
      card.style.setProperty("--yPos", `${y}px`);
    });
  });
});
