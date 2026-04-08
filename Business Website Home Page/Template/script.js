const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const closeNav = () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeNav();
    }
  });
}

document.querySelectorAll(".faq-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".faq-item");
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("active");
      const faqTrigger = faqItem.querySelector(".faq-trigger");
      if (faqTrigger) {
        faqTrigger.setAttribute("aria-expanded", "false");
      }
    });

    if (!isActive) {
      item.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});
