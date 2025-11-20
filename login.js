document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageBox = document.getElementById('message-box');

    messageBox.textContent = '';
    messageBox.classList.remove('message-error', 'message-success');

    if (!username || !password) {
        // If either field is empty after trimming whitespace
        showMessage('You must fill in both the username and password fields!', 'error');
        return;
    }
    
    if (username.length < 3) {
         showMessage('Username must be at least 3 characters long.', 'error');
         return;
    }

    console.log(`Attempting login with Username: ${username} and Password: (hidden)`);
    showMessage('Login successful! Redirecting...', 'success');

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500); 
});




function showMessage(message, type) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;

    if (type === 'success') {
        messageBox.classList.add('message-success');
    } else { 
        messageBox.classList.add('message-error');
    }
}