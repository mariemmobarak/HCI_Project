function changeFont() {
  alert("Change font clicked!");
}

function homePage() {
  window.location.href = "dashboard.html";
}

function editAvatar() {
  alert("Edit avatar clicked!");
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    // Show success message
    showLogoutSuccess();
    // Redirect after a short delay to allow user to see the message
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
}

function showLogoutSuccess() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;

  // Create popup
  const popup = document.createElement("div");
  popup.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        border: 4px solid #1a4046;
        box-shadow: 12px 12px 0 0 rgba(0, 0, 0, 0.9);
        text-align: center;
        max-width: 400px;
        animation: slideDown 0.3s ease;
    `;

  popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
        <h2 style="color: #1a4046; font-size: 1.5rem; margin-bottom: 0.5rem;">Logout Successful!</h2>
        <p style="color: #4b5563; font-size: 1rem;">See you next time!</p>
    `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Add animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
  document.head.appendChild(style);
}

function playFidgetSpinner() {
  window.location.href = "fidget_spinner.html";
}

function playMemoryGame() {
  window.location.href = "memory.html";
}

// Redirect from other pages when avatar is clicked
document.querySelectorAll(".avatar-link").forEach((avatar) => {
  avatar.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
});

// profile.js

// List your avatar images here (replace with the actual files you're providing).
// Use relative paths from the HTML file. Example: "/assets/avatars/child1.png"
const avatarImages = [
  "/assets/girlAvatar.png",
  "/assets/avatarr2.png",
  "/assets/avatarr3.png",
];

// Elements
const modal = document.getElementById("avatar-modal");
const avatarGrid = document.getElementById("avatar-grid");
const closeModalBtn = document.getElementById("close-modal");
const cancelModalBtn = document.getElementById("cancel-modal");
const editAvatarBtn = document.getElementById("edit-avatar-btn-main");
const editAvatarBtnTiny = document.getElementById("edit-avatar-btn");
const currentAvatar = document.getElementById("current-avatar");
const backdrop = document.getElementById("modal-backdrop");

// Load saved avatar from localStorage
const saved = localStorage.getItem("selectedAvatar");
if (saved) {
  currentAvatar.src = saved;
}

// Build grid of thumbnails
function buildGallery() {
  avatarGrid.innerHTML = "";
  avatarImages.forEach((src) => {
    const btn = document.createElement("button");
    btn.className = "avatar-thumb";
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-label", "Choose avatar");
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Avatar option";
    btn.appendChild(img);

    // highlight if it's the current one
    if (
      currentAvatar.src.endsWith(src) ||
      currentAvatar.src === src ||
      saved === src
    ) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      setAvatar(src);
      closeModal();
    });

    avatarGrid.appendChild(btn);
  });
}

function openModal() {
  buildGallery();
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  // trap focus briefly on the modal
  closeModalBtn.focus();
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

function setAvatar(src) {
  currentAvatar.src = src;
  localStorage.setItem("selectedAvatar", src);
  // visual feedback: small pop
  currentAvatar.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" },
    ],
    { duration: 260, easing: "ease-out" }
  );
}

// events
closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

editAvatarBtn.addEventListener("click", openModal);
if (editAvatarBtnTiny) {
  editAvatarBtnTiny.addEventListener("click", openModal);
}

// keyboard: Esc to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") closeModal();
});

/* --- Font dropdown logic --- */
const fontDropdown = document.getElementById("font-dropdown");
const fontForm = document.getElementById("font-form");
const fontToggleBtn = document.getElementById("font-toggle-btn");

function applyFont(name) {
  // Remove previous classes from both html and body, then add the new one.
  document.documentElement.classList.remove(
    "font-fredoka",
    "font-inter",
    "font-georgia"
  );
  document.body.classList.remove("font-fredoka", "font-inter", "font-georgia");
  if (name === "fredoka") {
    document.documentElement.classList.add("font-fredoka");
    document.body.classList.add("font-fredoka");
    document.body.style.fontFamily = "'Fredoka', sans-serif";
  }
  if (name === "inter") {
    document.documentElement.classList.add("font-inter");
    document.body.classList.add("font-inter");
    document.body.style.fontFamily =
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
  }
  if (name === "georgia") {
    document.documentElement.classList.add("font-georgia");
    document.body.classList.add("font-georgia");
    document.body.style.fontFamily = "Georgia, 'Times New Roman', serif";
  }
  localStorage.setItem("selectedFont", name);
}

function toggleFontDropdown(btn) {
  if (!fontDropdown) return;
  const isActive = fontDropdown.classList.contains("active");

  // Close other dropdowns if any (safe)
  document.querySelectorAll(".dropdown-content").forEach((d) => {
    if (d !== fontDropdown) {
      d.classList.remove("active");
    }
  });

  if (isActive) {
    fontDropdown.classList.remove("active");
    fontDropdown.setAttribute("aria-hidden", "true");
    return;
  }

  // Insert dropdown after the button so it pushes content down
  btn.insertAdjacentElement("afterend", fontDropdown);
  fontDropdown.classList.add("active");
  fontDropdown.setAttribute("aria-hidden", "false");
}

// apply saved font on load
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("selectedFont");
  if (saved) applyFont(saved);
  // set radio if present
  if (saved) {
    const r = document.querySelector(`input[name="font"][value="${saved}"]`);
    if (r) r.checked = true;
  }
});

// handle form submit
fontForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="font"]:checked');
  if (selected) {
    // apply immediately so user sees the change, persist and then reload
    applyFont(selected.value);
    // close dropdown briefly then reload so all elements reset with the new font
    setTimeout(() => {
      fontDropdown.classList.remove("active");
      fontDropdown.setAttribute("aria-hidden", "true");
      // reload to ensure every element that had inline or specific font rules picks up the new class
      location.reload();
    }, 180);
  }
});

// cancel button
document.getElementById("cancel-font")?.addEventListener("click", () => {
  fontDropdown.classList.remove("active");
  fontDropdown.setAttribute("aria-hidden", "true");
});

// clicking outside closes the dropdown (but not the avatar modal)
document.addEventListener("click", function (e) {
  if (
    !e.target.closest("#font-dropdown") &&
    !e.target.closest("#font-toggle-btn")
  ) {
    fontDropdown?.classList.remove("active");
    fontDropdown?.setAttribute("aria-hidden", "true");
  }
});

// Help modal functionality
const helpBtn = document.getElementById("help-btn");
const helpModal = document.getElementById("help-modal");
const closeHelp = document.getElementById("close-help");

if (helpBtn) {
  helpBtn.addEventListener("click", function () {
    helpModal.style.display = "flex";
  });
}

if (closeHelp) {
  closeHelp.addEventListener("click", function () {
    helpModal.style.display = "none";
  });
}

if (helpModal) {
  helpModal.addEventListener("click", function (e) {
    if (e.target === helpModal) {
      helpModal.style.display = "none";
    }
  });
}

// Close help modal with Escape key (avoid conflict with avatar modal)
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    helpModal &&
    helpModal.style.display === "flex" &&
    modal.style.display !== "flex"
  ) {
    helpModal.style.display = "none";
  }
});
