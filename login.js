// Real-time validation
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameGroup = document.getElementById("username-group");
const passwordGroup = document.getElementById("password-group");

// Username validation
usernameInput.addEventListener("input", function () {
  const value = this.value.trim();
  usernameGroup.classList.remove("input-valid", "input-invalid");

  if (
    value.length >= 3 &&
    value.length <= 20 &&
    /^[a-zA-Z0-9_.]+$/.test(value)
  ) {
    usernameGroup.classList.add("input-valid");
  } else if (value.length > 0) {
    usernameGroup.classList.add("input-invalid");
  }
});

// Password validation
passwordInput.addEventListener("input", function () {
  const value = this.value.trim();
  passwordGroup.classList.remove("input-valid", "input-invalid");

  if (value.length >= 6) {
    passwordGroup.classList.add("input-valid");
  } else if (value.length > 0) {
    passwordGroup.classList.add("input-invalid");
  }
});

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("message-box");

    messageBox.textContent = "";
    messageBox.classList.remove("message-error", "message-success");

    // Specific validation messages
    if (!username && !password) {
      showMessage(
        "Please enter both username and password to continue.",
        "error"
      );
      return;
    }

    if (!username) {
      showMessage(
        "Username field cannot be empty. Please enter your username.",
        "error"
      );
      usernameInput.focus();
      return;
    }

    if (!password) {
      showMessage(
        "Password field cannot be empty. Please enter your password.",
        "error"
      );
      passwordInput.focus();
      return;
    }

    if (username.length < 3) {
      showMessage(
        "Username is too short. It must be at least 3 characters long.",
        "error"
      );
      usernameInput.focus();
      return;
    }

    if (username.length > 20) {
      showMessage(
        "Username is too long. It must be 20 characters or less.",
        "error"
      );
      usernameInput.focus();
      return;
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      showMessage(
        "Username can only contain letters, numbers, underscores, and periods.",
        "error"
      );
      usernameInput.focus();
      return;
    }

    if (password.length < 6) {
      showMessage(
        "Password is too short. It must be at least 6 characters for security.",
        "error"
      );
      passwordInput.focus();
      return;
    }

    console.log(
      `Attempting login with Username: ${username} and Password: (hidden)`
    );
    showMessage("Login successful! Redirecting...", "success");

    setTimeout(() => {
      if (username === "marwa.shahin") {
        window.location.href = "parent.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 500);
  });

function showMessage(message, type) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;

  if (type === "success") {
    messageBox.classList.add("message-success");
  } else {
    messageBox.classList.add("message-error");
  }
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
  if (e.key === "Escape" && helpModal.style.display === "flex") {
    helpModal.style.display = "none";
  }
});
