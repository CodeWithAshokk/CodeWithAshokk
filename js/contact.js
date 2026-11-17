/**
 * ============================================================================
 * CODE WITH ASHOK - CONTACT FORM VALIDATION & DISPATCH (contact.js)
 * Clean, accessible Vanilla JS for input validation, character counters,
 * and transparent, honest submission handling without deceptive fake claims.
 * ============================================================================
 */

(function () {
  'use strict';

  // Configurable Developer Email Address
  const DEVELOPER_EMAIL = 'codewithashokk@gmail.com';

  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const messageCharCount = document.getElementById('message-char-count');
  const formStatusAlert = document.getElementById('form-status-alert');
  const submitBtn = document.getElementById('contact-submit-btn');

  // --------------------------------------------------------------------------
  // 1. VALIDATION REGEX & RULES
  // --------------------------------------------------------------------------
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/;

  function validateField(input, condition, errorMsgId, errorText) {
    const errorEl = document.getElementById(errorMsgId);
    if (!condition) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = errorText;
        errorEl.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
      return true;
    }
  }

  function checkName() {
    const val = nameInput.value.trim();
    if (!val) {
      return validateField(nameInput, false, 'name-error', 'Full name is required.');
    }
    if (!NAME_REGEX.test(val)) {
      return validateField(nameInput, false, 'name-error', 'Please enter a valid name (2-50 letters).');
    }
    return validateField(nameInput, true, 'name-error', '');
  }

  function checkEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      return validateField(emailInput, false, 'email-error', 'Email address is required.');
    }
    if (!EMAIL_REGEX.test(val)) {
      return validateField(emailInput, false, 'email-error', 'Please enter a valid email address (e.g. name@domain.com).');
    }
    return validateField(emailInput, true, 'email-error', '');
  }

  function checkSubject() {
    const val = subjectInput.value.trim();
    if (!val) {
      return validateField(subjectInput, false, 'subject-error', 'Subject is required.');
    }
    if (val.length < 3) {
      return validateField(subjectInput, false, 'subject-error', 'Subject must be at least 3 characters.');
    }
    return validateField(subjectInput, true, 'subject-error', '');
  }

  function checkMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      return validateField(messageInput, false, 'message-error', 'Message cannot be empty.');
    }
    if (val.length < 15) {
      return validateField(messageInput, false, 'message-error', 'Please provide a little more detail (at least 15 characters).');
    }
    return validateField(messageInput, true, 'message-error', '');
  }

  // --------------------------------------------------------------------------
  // 2. REALTIME INPUT LISTENERS
  // --------------------------------------------------------------------------
  if (nameInput) {
    nameInput.addEventListener('blur', checkName);
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('error')) checkName();
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', checkEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('error')) checkEmail();
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', checkSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.classList.contains('error')) checkSubject();
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      if (messageCharCount) {
        messageCharCount.textContent = `${length} / 1500`;
      }
      if (messageInput.classList.contains('error')) checkMessage();
    });
    messageInput.addEventListener('blur', checkMessage);
  }

  // --------------------------------------------------------------------------
  // 3. FORM SUBMISSION HANDLER
  // --------------------------------------------------------------------------
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isSubjectValid = checkSubject();
    const isMessageValid = checkMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      if (formStatusAlert) {
        formStatusAlert.className = 'form-status-alert info';
        formStatusAlert.style.display = 'flex';
        formStatusAlert.innerHTML = `
          <span>⚠️ Please resolve the highlighted errors before proceeding.</span>
        `;
      }
      return;
    }

    // Set loading state on button
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin-animation" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Preparing Email...
    `;

    // Construct Mailto URI with safe URI encoding
    const name = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const rawMessage = messageInput.value.trim();

    const emailBody = `Hi Ashok Kumar Saini,\n\nName: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${rawMessage}\n\n---\nSent via Code With Ashok Portfolio`;

    const mailtoUrl = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject}`
    )}&body=${encodeURIComponent(emailBody)}`;

    // Honest handling: Open mail client or prompt user to copy
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      if (formStatusAlert) {
        formStatusAlert.className = 'form-status-alert success';
        formStatusAlert.style.display = 'flex';
        formStatusAlert.innerHTML = `
          <div>
            <strong>✓ Form Validated!</strong> Opening your email client to send your message directly to <strong>${DEVELOPER_EMAIL}</strong>.
            <div style="margin-top: 0.5rem; font-size: 0.825rem; opacity: 0.9;">
              If your email client didn't open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: bold; color: inherit;">click here to launch email</a> or email directly at <code>${DEVELOPER_EMAIL}</code>.
            </div>
          </div>
        `;
      }

      // Trigger mailto intent
      window.location.href = mailtoUrl;
    }, 600);
  });

})();
