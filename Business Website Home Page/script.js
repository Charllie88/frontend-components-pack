// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu toggle with enhanced animations
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function closeMobileMenu() {
  if (!hamburger || !navLinks) {
    return;
  }

  navLinks.classList.remove("active");
  hamburger.classList.remove("active");
  document.body.classList.remove("nav-open");
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.classList.toggle(
      "nav-open",
      navLinks.classList.contains("active"),
    );
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Add background blur on scroll
  if (scrollTop > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Button ripple effect
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = e.offsetX - 10 + "px";
    ripple.style.top = e.offsetY - 10 + "px";
    ripple.style.width = "20px";
    ripple.style.height = "20px";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Active navigation highlighting
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href");
    if (href.startsWith("#") && href.slice(1) === current) {
      item.classList.add("active");
    }
  });
});

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    if (!card.classList.contains("featured")) {
      card.style.transform = "translateY(0) scale(1)";
    }
  });
});

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll(".stat h3");
  stats.forEach((stat) => {
    const target = parseInt(stat.textContent.replace(/[^\d]/g, ""));
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent =
          target +
          (stat.textContent.includes("+")
            ? "+"
            : stat.textContent.includes("%")
              ? "%"
              : "");
        clearInterval(timer);
      } else {
        stat.textContent =
          Math.floor(current) +
          (stat.textContent.includes("+")
            ? "+"
            : stat.textContent.includes("%")
              ? "%"
              : "");
      }
    }, 20);
  });
}

// Trigger stats animation when hero section is visible
const heroSection = document.querySelector(".hero");
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

if (heroSection) {
  heroObserver.observe(heroSection);
}

// FAQ Accordion functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Open clicked item if it wasn't already active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// Contact form validation and submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    if (!subject) {
      alert("Please select a subject");
      return;
    }

    if (!message) {
      alert("Please enter your message");
      return;
    }

    // Success message
    const successMsg = document.createElement("div");
    successMsg.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      animation: slideIn 0.3s ease;
    `;
    successMsg.textContent = `Thank you ${name}! We've received your message and will get back to you soon.`;
    document.body.appendChild(successMsg);

    // Reset form
    contactForm.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMsg.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        successMsg.remove();
      }, 300);
    }, 5000);
  });

  // Add animations for success message
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}
