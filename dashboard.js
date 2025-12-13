document.addEventListener("DOMContentLoaded", () => {
  const avatarLink = document.querySelector(".avatar-link");
  if (avatarLink) {
    avatarLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "profile.html";
    });
  }

  const englishLink = document.getElementById("english-link");
  if (englishLink) {
    englishLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Redirecting to Reading page...");
      window.location.href = "reading.html";
    });
  }

  const scienceLink = document.getElementById("science-link");
  if (scienceLink) {
    scienceLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Redirecting to Science page...");
      window.location.href = "science.html";
    });
  }

  const mathLink = document.getElementById("math-link");
  if (mathLink) {
    mathLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Redirecting to Reading page...");
      window.location.href = "math.html";
    });
  }

  const arabicLink = document.getElementById("arabic-link");
  if (arabicLink) {
    arabicLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Redirecting to Arabic page...");
      window.location.href = "arabic.html";
    });
  }
  const germanLink = document.getElementById("german-link");
  if (germanLink) {
    germanLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Redirecting to German page...");
      window.location.href = "german.html";
    });
  }
  document
    .querySelectorAll(
      ".subject-link:not(#english-link):not(#science-link):not(#math-link):not(#arabic-link):not(#german-link)"
    )
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const title = e.currentTarget.title;
        console.log(`Loading ${title}. (No page yet)`);
      });
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

  // Close help modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && helpModal && helpModal.style.display === "flex") {
      helpModal.style.display = "none";
    }
  });
});
