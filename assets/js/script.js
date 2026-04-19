'use strict';
// ─────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────
// STEP 1: Go to https://www.emailjs.com and create a free account
// STEP 2: Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// STEP 3: Create an Email Template → copy the Template ID
//         Make sure your template uses these variables:
//           {{from_name}}  {{from_email}}  {{subject}}  {{message}}
// STEP 4: Go to Account → API Keys → copy your Public Key
// STEP 5: Replace the placeholder values below with your real IDs

let EMAILJS_PUBLIC_KEY="e2xdKM7_yNyRgiqoS";
let EMAILJS_SERVICE_ID="service_kw7uj5l";
let EMAILJS_TEMPLATE_ID="template_iqj09rf";

let emailjsReady = false;

// Initialize EmailJS
if (window.emailjs) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjsReady = true;
    console.log("✅ EmailJS initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize EmailJS:", error);
  }
} else {
  console.error("❌ EmailJS library not loaded");
}

// ─────────────────────────────────────────────
// Helper: Show Toast
// ─────────────────────────────────────────────
function showToast(message, type) {
  const toast = document.getElementById("form-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  if (type === "success") {
    toast.style.background = "rgba(80, 200, 120, 0.15)";
    toast.style.color = "#50c878";
    toast.style.border = "1px solid rgba(80, 200, 120, 0.4)";
  } else {
    toast.style.background = "rgba(255, 80, 80, 0.15)";
    toast.style.color = "#ff6b6b";
    toast.style.border = "1px solid rgba(255, 80, 80, 0.4)";
  }
  setTimeout(() => { toast.style.display = "none"; }, 5000);
}

// ─────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// ─────────────────────────────────────────────
// Testimonials Modal
// ─────────────────────────────────────────────
const testimonialsItem  = document.querySelectorAll("[data-testimonials-item]");
const modalContainer    = document.querySelector("[data-modal-container]");
const modalCloseBtn     = document.querySelector("[data-modal-close-btn]");
const overlay           = document.querySelector("[data-overlay]");
const modalImg          = document.querySelector("[data-modal-img]");
const modalTitle        = document.querySelector("[data-modal-title]");
const modalText         = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src   = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt   = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML  = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ─────────────────────────────────────────────
// Custom Select / Filter
// ─────────────────────────────────────────────
const select      = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn   = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ─────────────────────────────────────────────
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

// Enable button
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.toggleAttribute("disabled", !form.checkValidity());
  });
});

// Submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!emailjsReady) {
    showToast("❌ Email service not ready, please try again later", "error");
    return;
  }

  const btnText  = formBtn.querySelector("span");
  const origText = btnText.innerText;

  btnText.innerText = "Sending...";
  formBtn.disabled = true;

  const templateParams = {
    from_name:  form.fullname.value.trim(),
    from_email: form.email.value.trim(),
    subject:    form.subject?.value.trim() || "Portfolio Contact",
    message:    form.message.value.trim(),
    reply_to:   form.email.value.trim()
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showToast("✅ Message sent successfully!", "success");
      form.reset();
      formBtn.disabled = true;
      btnText.innerText = origText;
    })
    .catch((error) => {
      console.error(error);
      showToast("❌ Failed to send message", "error");
      formBtn.disabled = false;
      btnText.innerText = origText;
    });
});
// ─────────────────────────────────────────────
// Page Navigation
// ─────────────────────────────────────────────
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages           = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
