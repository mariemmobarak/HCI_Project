document.addEventListener('DOMContentLoaded', () => {
    const avatarLink = document.querySelector('.avatar-link');
    if (avatarLink) {
        avatarLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    const englishLink = document.getElementById('english-link');
    if (englishLink) {
        englishLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Redirecting to Reading page...');
            window.location.href = 'reading.html';
        });
    }

    const scienceLink = document.getElementById('science-link');
    if (scienceLink) {
        scienceLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Redirecting to Science page...');
            window.location.href = 'science.html';
        });
    }

    const mathLink = document.getElementById('math-link');
    if (mathLink) {
        mathLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Redirecting to Reading page...');
            window.location.href = 'math.html';
        });
    }

    document.querySelectorAll('.subject-link:not(#english-link):not(#science-link):not(#math-link)').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const title = e.currentTarget.title;
            console.log(`Loading ${title}. (No page yet)`);
        });
    });
});