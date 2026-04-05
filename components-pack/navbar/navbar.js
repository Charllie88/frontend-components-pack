const toggleButton = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".primary-nav");

if (toggleButton && navMenu) {
  toggleButton.addEventListener("click", () => {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    toggleButton.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("active");
    toggleButton.classList.toggle("active");
  });
}
