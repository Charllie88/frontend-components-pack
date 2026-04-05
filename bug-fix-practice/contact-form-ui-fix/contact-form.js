/**
 * Contact Form UI Component
 * Handles form structure, validation, and submission
 *
 * PRACTICE: Form Structure
 * This demonstrates how to:
 * 1. Select form elements by ID
 * 2. Capture form submission event
 * 3. Collect form data using FormData API
 * 4. Convert form data to object with Object.fromEntries()
 * 5. Validate form inputs before submission
 * 6. Display success/error messages
 */

// Step 1: Select the form element by ID
const contactForm = document.getElementById("contactForm");

// Step 2: Select the message container for feedback
const formMessage = document.getElementById("formMessage");

// Step 3: Listen for form submission
contactForm.addEventListener("submit", (e) => {
  // Prevent default form submission (page reload)
  e.preventDefault();

  // Step 4: Collect all form data using FormData API
  // FormData automatically collects all named inputs in the form
  const formData = new FormData(contactForm);

  // Step 5: Convert FormData to a plain JavaScript object
  // This makes data easier to work with (data.name, data.email, etc.)
  const data = Object.fromEntries(formData);

  // Step 6: Validate form inputs (client-side only)
  // Check 1: Required fields are not empty
  if (
    !data.name.trim() ||
    !data.email.trim() ||
    !data.subject ||
    !data.message.trim()
  ) {
    showMessage("Please fill in all required fields.", "error");
    return; // Stop processing
  }

  // Check 2: Email format is valid
  if (!validateEmail(data.email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Check 3: Checkbox was checked
  if (!data.privacy) {
    showMessage("Please agree to the privacy policy.", "error");
    return;
  }

  // Step 7: Disable button to prevent double submission
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Step 8: Simulate form submission (in real apps, this would send to a server)
  setTimeout(() => {
    showMessage(
      "Message sent successfully! We'll get back to you soon.",
      "success",
    );
    contactForm.reset(); // Clear all form fields
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 1500);
});

/**
 * PRACTICE: Email Validation
 * Uses Regular Expression (Regex) to check email format
 *
 * Pattern breakdown:
 * ^ = start of string
 * [^\s@]+ = one or more characters that are NOT whitespace or @
 * @ = literal @ symbol
 * [^\s@]+ = one or more characters that are NOT whitespace or @
 * \. = literal dot (. needs to be escaped with \)
 * [^\s@]+ = one or more characters that are NOT whitespace or @
 * $ = end of string
 *
 * Examples:
 * VALID: user@example.com, john.doe@company.org
 * INVALID: user@, user.com, @example.com, user @example.com
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Returns true if regex matches
}

/**
 * PRACTICE: Display Messages
 * Shows success or error feedback to user
 *
 * Parameters:
 * - message: String to display
 * - type: "success" or "error" (affects styling)
 */
function showMessage(message, type) {
  // Set message content
  formMessage.textContent = message;

  // Set CSS classes for styling (light green or light red background)
  formMessage.className = `form-message ${type}`;

  // Auto-hide after 5 seconds
  setTimeout(() => {
    formMessage.className = "form-message";
  }, 5000);
}

/**
 * PRACTICE: Real-time Validation
 * Validates email as user leaves the field (blur event)
 * Provides immediate feedback with red border if invalid
 */
const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", () => {
  // Only validate if input has a value
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailInput.style.borderColor = "var(--form-error)";
  } else {
    emailInput.style.borderColor = "var(--form-border)";
  }
});

/**
 * KEY LEARNING CONCEPTS
 *
 * FORM STRUCTURE:
 * 1. HTML forms have a <form> element
 * 2. Each input should have a name attribute (used to access data)
 * 3. Each input should have a label associated with it
 * 4. Use different input types for different data (email, tel, text, etc.)
 *
 * FORM DATA HANDLING:
 * 1. FormData API collects all inputs with name attributes
 * 2. Object.fromEntries() converts FormData to JavaScript object
 * 3. data.fieldName accesses individual form fields
 * 4. .trim() removes whitespace and prevents empty strings
 *
 * FORM VALIDATION:
 * 1. Client-side validation gives instant feedback
 * 2. Always validate on blur (when user leaves field) and submit
 * 3. Use regex for complex patterns (emails, phones, etc.)
 * 4. Show clear error messages to help users fix problems
 *
 * FORM SUBMISSION:
 * 1. e.preventDefault() stops page reload
 * 2. Validate before sending data
 * 3. Disable submit button to prevent double-submission
 * 4. Show loading state to users
 * 5. Display success/error messages after submission
 *
 * BEST PRACTICES:
 * 1. All validation is FRONTEND ONLY (never trust client-side validation)
 * 2. Always validate on the server/backend as well
 * 3. Provide helpful error messages
 * 4. Give visual feedback (colors, icons, text)
 * 5. Make forms accessible with labels and ARIA attributes
 */
