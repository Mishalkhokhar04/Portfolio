/**
 * contact.js
 * Client-side validation runs no matter what (works with zero backend).
 * On submit, if valid, it also tries POSTing to a local backend
 * (server/server.js) at /api/contact. If the backend isn't running —
 * e.g. the site is just opened as static files — it fails over to a
 * mailto: link so the message is never silently lost.
 */

const CONTACT_API_URL = "http://localhost:4000/api/contact";

const RULES = {
  name: {
    validate: (v) => v.trim().length >= 2,
    message: "Please enter your full name (at least 2 characters).",
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: "Please enter a valid email address.",
  },
  subject: {
    validate: (v) => v.trim().length >= 3,
    message: "Subject should be at least 3 characters.",
  },
  message: {
    validate: (v) => v.trim().length >= 20,
    message: "Message should be at least 20 characters so I have enough context.",
  },
};

function fieldEls(name) {
  const input = document.getElementById(name);
  const wrapper = input ? input.closest(".field") : null;
  const errorEl = wrapper ? wrapper.querySelector(".error-msg") : null;
  return { input, wrapper, errorEl };
}

function validateField(name) {
  const { input, wrapper, errorEl } = fieldEls(name);
  if (!input) return true;

  const rule = RULES[name];
  const isValid = rule.validate(input.value);

  if (!isValid) {
    wrapper.classList.add("has-error");
    if (errorEl) errorEl.textContent = rule.message;
  } else {
    wrapper.classList.remove("has-error");
  }
  return isValid;
}

function validateAll() {
  return Object.keys(RULES)
    .map((name) => validateField(name))
    .every(Boolean);
}

function setStatus(el, type, text) {
  el.className = `form-status show ${type}`;
  el.textContent = text;
}

function initCharCount() {
  const textarea = document.getElementById("message");
  const counter = document.getElementById("messageCount");
  if (!textarea || !counter) return;
  const update = () => {
    counter.textContent = `${textarea.value.length} characters`;
  };
  textarea.addEventListener("input", update);
  update();
}

async function submitToBackend(payload) {
  const response = await fetch(CONTACT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Server rejected the request.");
  }
  return response.json();
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return; // not on the contact page

  const statusEl = document.getElementById("formStatus");
  initCharCount();

  Object.keys(RULES).forEach((name) => {
    const { input } = fieldEls(name);
    if (input) input.addEventListener("blur", () => validateField(name));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) {
      setStatus(statusEl, "error", "Please fix the highlighted fields and try again.");
      return;
    }

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "sending...";

    try {
      await submitToBackend(payload);
      setStatus(
        statusEl,
        "success",
        `Thanks, ${payload.name.split(" ")[0]} — your message has been received. I'll reply within a couple of days.`
      );
      form.reset();
      initCharCount();
    } catch (err) {
      // Backend not running or unreachable — fail over to mailto so the
      // message still reaches an inbox instead of just erroring out.
      const mailBody = encodeURIComponent(
        `${payload.message}\n\n— ${payload.name} (${payload.email})`
      );
      const mailtoLink = `mailto:hello@saramalik.dev?subject=${encodeURIComponent(
        payload.subject
      )}&body=${mailBody}`;

      setStatus(
        statusEl,
        "error",
        "Couldn't reach the contact server, so nothing was saved automatically."
      );
      statusEl.innerHTML += ` <a href="${mailtoLink}">Click here to send it by email instead ↗</a>`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "send message";
    }
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
