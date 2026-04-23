// NAV TOGGLE
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


// VIDEO PLAY (INLINE, NO MODAL)
const playButton = document.getElementById("playButton");
const tutorialBox = document.querySelector(".tutorial-box");

playButton.addEventListener("click", () => {
  tutorialBox.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/ZILH781tceE?autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      style="position:absolute; inset:0; width:100%; height:100%; border:0;">
    </iframe>
  `;
});