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
    window.location.href = 'login.html';
}

// Redirect from other pages when avatar is clicked
document.querySelectorAll('.avatar-link').forEach(avatar => {
    avatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
});
