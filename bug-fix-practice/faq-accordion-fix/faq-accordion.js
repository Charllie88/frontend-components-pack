/**
 * FAQ Accordion Component
 * Handles toggle functionality for FAQ items
 *
 * PRACTICE: Toggle Accordion
 * This demonstrates how to:
 * 1. Select multiple elements (querySelectorAll)
 * 2. Add event listeners to each element
 * 3. Toggle CSS classes to show/hide content
 * 4. Update ARIA attributes for accessibility
 * 5. Ensure only one accordion is open at a time
 */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
      item
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      faqItem.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// LEARNING NOTES:
// - classList.contains() checks if a class exists
// - classList.add() adds a class
// - classList.remove() removes a class
// - classList.toggle() adds or removes a class
// - forEach iterates through NodeList (like querySelectorAll result)
// - parentElement gets the parent HTML element
// - aria-expanded is for screen readers and accessibility

// -----------------------------
// Basic Validation UI (No backend)
// -----------------------------

const faqValidationForm = document.getElementById("faqValidationForm");
const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("userEmail");
const nameFeedback = document.getElementById("nameFeedback");
const emailFeedback = document.getElementById("emailFeedback");
const submitFeedback = document.getElementById("submitFeedback");

// Helper validators
const isNameValid = (name) => name.trim().length >= 2;
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateField = (
  input,
  isValid,
  feedbackEl,
  successMessage,
  errorMessage,
) => {
  if (!input.value.trim()) {
    input.classList.remove("valid", "invalid");
    feedbackEl.textContent = "";
    return false;
  }

  if (isValid(input.value)) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    feedbackEl.textContent = successMessage;
    feedbackEl.className = "feedback success";
    return true;
  }

  input.classList.add("invalid");
  input.classList.remove("valid");
  feedbackEl.textContent = errorMessage;
  feedbackEl.className = "feedback error";
  return false;
};

nameInput.addEventListener("input", () => {
  validateField(
    nameInput,
    isNameValid,
    nameFeedback,
    "Name looks good",
    "Name must be at least 2 characters",
  );
});

emailInput.addEventListener("input", () => {
  validateField(
    emailInput,
    isEmailValid,
    emailFeedback,
    "Email is valid",
    "Please enter a valid email address",
  );
});

faqValidationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValid = validateField(
    nameInput,
    isNameValid,
    nameFeedback,
    "Name looks good",
    "Name must be at least 2 characters",
  );
  const emailValid = validateField(
    emailInput,
    isEmailValid,
    emailFeedback,
    "Email is valid",
    "Please enter a valid email address",
  );

  if (!nameValid || !emailValid) {
    submitFeedback.textContent = "Please fix errors before submitting.";
    submitFeedback.className = "submit-feedback error";
    return;
  }

  submitFeedback.textContent =
    "Validation passed! (No backend submission in this demo)";
  submitFeedback.className = "submit-feedback success";
  faqValidationForm.reset();

  nameInput.classList.remove("valid", "invalid");
  emailInput.classList.remove("valid", "invalid");

  setTimeout(() => {
    submitFeedback.textContent = "";
    submitFeedback.className = "submit-feedback";
  }, 3500);
});
