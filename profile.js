function changeFont() {
    alert('Change font clicked!');
}

function homePage() {
    window.location.href = 'dashboard.html';
}

function editAvatar() {
    alert('Edit avatar clicked!');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'login.html';
    }
}

function playFidgetSpinner() {
    window.location.href = 'fidget_spinner.html';
}

function playMemoryGame() {
    window.location.href = 'memory.html';
}

// Redirect from other pages when avatar is clicked
document.querySelectorAll('.avatar-link').forEach(avatar => {
    avatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
});

// profile.js

// List your avatar images here (replace with the actual files you're providing).
// Use relative paths from the HTML file. Example: "/assets/avatars/child1.png"
const avatarImages = [
  "/assets/girlAvatar.png",
  "/assets/avatarr2.png",
  "/assets/avatarr3.png"
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
  avatarImages.forEach(src => {
    const btn = document.createElement("button");
    btn.className = "avatar-thumb";
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-label", "Choose avatar");
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Avatar option";
    btn.appendChild(img);

    // highlight if it's the current one
    if (currentAvatar.src.endsWith(src) || currentAvatar.src === src || saved === src) {
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
  currentAvatar.animate([
    { transform: "scale(1)" },
    { transform: "scale(1.06)" },
    { transform: "scale(1)" }
  ], { duration: 260, easing: "ease-out" });
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
