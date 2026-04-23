const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

menuToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
  });
});

const playButton = document.getElementById("playButton");
const videoModal = document.getElementById("videoModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

function openModal() {
  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

playButton.addEventListener("click", openModal);
modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});