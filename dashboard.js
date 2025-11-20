document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Avatar Click 
    const avatarLink = document.querySelector('.avatar-link');
    if (avatarLink) {
        avatarLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    // 2. Handle English Subject Click (Redirection)
    const englishLink = document.getElementById('english-link');
    if (englishLink) {
        englishLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Redirecting to Reading page...');
            // Redirect to the new reading page
            window.location.href = 'reading.html';
        });
    }

    const mathLink = document.getElementById('math-link');
    if (mathLink) {
        mathLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Redirecting to Reading page...');
            // Redirect to the new reading page
            window.location.href = 'math.html';
        });
    }

    // 3. Handle Other Subject Clicks (Currently placeholders)
    document.querySelectorAll('.subject-link:not(#english-link):not(#math-link)').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const title = e.currentTarget.title;
            console.log(`Loading ${title}. (No page yet)`);
        });
    });
});