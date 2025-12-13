document.addEventListener("DOMContentLoaded", () => {
  const readAlongButton = document.getElementById("read-along-button");
  const videoModal = document.getElementById("video-modal");
  const closeButton = document.querySelector(".video-modal .close-button");
  const videoEl = document.getElementById("read-along-video");
  const videoSource = document.getElementById("read-along-source");

  const avatarLink = document.querySelector(".avatar-link");
  if (avatarLink) {
    avatarLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "profile.html";
    });
  }
  function showVideoModal(videoPath = "/assets/reading.mp4") {
    videoSource.src = videoPath;
    videoEl.load();
    videoModal.classList.remove("hidden");

    const playPromise = videoEl.play();
    if (playPromise) {
      playPromise.catch(() => console.warn("Autoplay was prevented."));
    }
  }

  function hideVideoModal() {
    videoEl.pause();
    videoEl.currentTime = 0;
    videoModal.classList.add("hidden");
  }

  if (readAlongButton) {
    readAlongButton.addEventListener("click", () => {
      showVideoModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", hideVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        hideVideoModal();
      }
    });
  }

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

  // Close help modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && helpModal && helpModal.style.display === "flex") {
      helpModal.style.display = "none";
    }
  });
});
