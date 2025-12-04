document.addEventListener('DOMContentLoaded', () => {
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');
let current = 0;
const count = slides.length;
const intervalMs = 4000;
let timer = null;


slides.forEach((s,i)=>{
const b = document.createElement('button');
b.setAttribute('role','tab');
b.setAttribute('aria-pressed', i===0 ? 'true' : 'false');
b.setAttribute('aria-label', `Go to slide ${i+1}`);
b.addEventListener('click', ()=> goTo(i));
dotsContainer.appendChild(b);
});
const dots = Array.from(dotsContainer.children);


function show(idx){
slides.forEach((s,i)=>{
const visible = i===idx;
s.setAttribute('aria-hidden', visible ? 'false' : 'true');
dots[i].setAttribute('aria-pressed', visible ? 'true' : 'false');
});
current = idx;
}
function goTo(i){
i = (i + count) % count;
show(i);
restart();
}
prevBtn?.addEventListener('click', ()=> goTo(current-1));
nextBtn?.addEventListener('click', ()=> goTo(current+1));


const carousel = document.getElementById('lesson-content');
carousel?.addEventListener('keydown', (e)=>{
if (e.key === 'ArrowLeft') prevBtn?.click();
if (e.key === 'ArrowRight') nextBtn?.click();
});


function start(){ timer = setInterval(()=> goTo(current+1), intervalMs); }
function stop(){ clearInterval(timer); timer = null; }
function restart(){ stop(); start(); }


carousel?.addEventListener('mouseenter', stop);
carousel?.addEventListener('mouseleave', start);
carousel?.addEventListener('focusin', stop);
carousel?.addEventListener('focusout', start);


show(0);
start();
});

let currentQuestionIndex = 0;
let score = 0;
const TOTAL_QUESTIONS = 5;
let speakerTimeout = null;
let listenTimeout = null; 

const quizQuestions = [
    { num1: 3, num2: 4, answer: 12, audio: "/assets/audio/q1.mp3" },
    { num1: 7, num2: 2, answer: 14 , audio: "/assets/audio/q2.webm"},
    { num1: 5, num2: 5, answer: 25, audio: "/assets/audio/q3.webm" },
    { num1: 9, num2: 1, answer: 9 , audio: "/assets/audio/q4.webm"},
    { num1: 6, num2: 3, answer: 18, audio: "/assets/audio/q5.webm" }
];

document.addEventListener('DOMContentLoaded', () => {
    const lessonContent = document.getElementById('lesson-content');
    const quizContainer = document.getElementById('quiz-container');
    const takeQuizButton = document.getElementById('take-quiz-button');
    const submitAnswerButton = document.getElementById('submit-answer-button');
    const retakeQuizButton = document.getElementById('retake-quiz-button');
    const playSoundButton = document.getElementById('play-sound-button');
    const speakerIndicator = document.getElementById('speaker-indicator');
    const listenButton = document.getElementById('record-answer-button');
    const listenIndicator = document.getElementById('listener-indicator');

    const avatarLink = document.querySelector('.avatar-link');
    if (avatarLink) {
        avatarLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    if (takeQuizButton) {
        takeQuizButton.addEventListener('click', startQuiz);
    }
    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', checkAnswer);
    }
    if (retakeQuizButton) {
        retakeQuizButton.addEventListener('click', resetQuiz);
    }
    
    if (playSoundButton) {
        playSoundButton.addEventListener('click', () => {
            playQuestionAudio();
            showSpeakerIndicator();
        });
    }


    if (listenButton) {
        listenButton.addEventListener('click', () => {
            showListenerIndicator();
            clearListenTimeout();
            listenTimeout = setTimeout(() => {
                const answerInput = document.getElementById('answer-input');
                const question = quizQuestions[currentQuestionIndex];
                if (answerInput && question) {
                    answerInput.value = String(question.answer);
                    // place cursor at end and focus
                    answerInput.focus();
                    answerInput.setSelectionRange(answerInput.value.length, answerInput.value.length);
                }
            }, 1500);
        });
    }
    
    document.getElementById('answer-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
        }
    });

    function showSpeakerIndicator() {
        if (!speakerIndicator) return;
        
        if (speakerTimeout) {
            clearTimeout(speakerTimeout);
        }
        
        speakerIndicator.classList.remove('hidden');
        
        speakerTimeout = setTimeout(() => {
            speakerIndicator.classList.add('hidden');
        }, 10000);
    }
    function playQuestionAudio() {
        const audioFile = quizQuestions[currentQuestionIndex].audio;
        const questionAudio = new Audio(audioFile);
        questionAudio.play().catch(e => console.log("Audio playback failed:", e));
    }
    function showListenerIndicator() {
        if (!listenIndicator) return;
        
        if (speakerTimeout) {
            clearTimeout(speakerTimeout);
        }
        
        listenIndicator.classList.remove('hidden');
        
        speakerTimeout = setTimeout(() => {
            listenIndicator.classList.add('hidden');
        }, 3000);
    }

    function clearListenTimeout() {
        if (listenTimeout) {
            clearTimeout(listenTimeout);
            listenTimeout = null;
        }
    }

    function startQuiz() {
        quizContainer.removeAttribute('inert');
        lessonContent.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        document.getElementById('result-screen').classList.add('hidden');

        if (takeQuizButton) {
            takeQuizButton.style.display = 'none';
            takeQuizButton.setAttribute('aria-expanded', 'true');
        }

        currentQuestionIndex = 0;
        score = 0;
        renderQuestion();
    }

    function renderQuestion() {
        clearListenTimeout();

        const question = quizQuestions[currentQuestionIndex];
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const answerInput = document.getElementById('answer-input');

        document.getElementById('question-text').textContent = `${question.num1} × ${question.num2} = ?`;
        answerInput.value = ''; 
        answerInput.focus(); 
        document.getElementById('feedback-message').classList.add('hidden');

        // Update Progress Bar
        const progress = ((currentQuestionIndex) / TOTAL_QUESTIONS) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${TOTAL_QUESTIONS}`;
    }

    function checkAnswer() {
        clearListenTimeout();

        const answerInput = document.getElementById('answer-input');
        const feedbackMessage = document.getElementById('feedback-message');
        const userAnswer = parseInt(answerInput.value.trim(), 10);
        const question = quizQuestions[currentQuestionIndex];

        feedbackMessage.classList.remove('hidden', 'feedback-correct', 'feedback-wrong');
        
        if (isNaN(userAnswer) || answerInput.value.trim() === '') {
            feedbackMessage.textContent = 'Please enter a number!';
            feedbackMessage.classList.add('feedback-wrong');
            return;
        }

        if (userAnswer === question.answer) {
            score++;
            feedbackMessage.textContent = 'Correct!';
            feedbackMessage.classList.add('feedback-correct');
            const hooraySound = new Audio('/assets/hooray.m4a');
            hooraySound.play().catch(e => console.log('Audio playback failed:', e));
            setTimeout(nextQuestion, 800);
        } else {
            feedbackMessage.textContent = `Not quite, but you're learning! Remember: ${question.num1} × ${question.num2} means adding ${question.num2} a total of ${question.num1} times, which gives ${question.answer}.`;
            feedbackMessage.classList.add('feedback-wrong');
            setTimeout(nextQuestion, 4500); 
        }
    }

    function nextQuestion() {
        clearListenTimeout();

        currentQuestionIndex++;
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
            renderQuestion();
        } else {
            document.getElementById('progress-fill').style.width = '100%';
            document.getElementById('progress-text').textContent = `Quiz Complete!`;
            showResult();
        }
    }

    function showResult() {
        quizContainer.classList.add('hidden');
        const resultScreen = document.getElementById('result-screen');
        const gradeDisplay = document.getElementById('grade-display');
        const scoreSummary = document.getElementById('score-summary');
        const resultMessage = document.getElementById('result-message');
        const retakeButton = document.getElementById('retake-quiz-button');
        
        const percentage = (score / TOTAL_QUESTIONS) * 100;
        let grade, message;

        gradeDisplay.classList.remove('grade-excellent', 'grade-good', 'grade-needs-work');

        if (percentage >= 80) {
            grade = 'A+';
            message = "Amazing work! You are a multiplication master!";
            gradeDisplay.classList.add('grade-excellent');
            setTimeout(() => {
                 window.location.href = 'dashboard.html'; 
            }, 2000); 
            
        } else if (percentage >= 60) {
            grade = 'B';
            message = "Well done! Keep practicing, you're close to a perfect score!";
            gradeDisplay.classList.add('grade-good');
        } else {
            grade = 'C';
            message = "Good try! Review your times tables and try again!";
            gradeDisplay.classList.add('grade-needs-work');
        }

        gradeDisplay.textContent = grade;
        scoreSummary.textContent = `You answered ${score} out of ${TOTAL_QUESTIONS} questions correctly.`;
        resultMessage.textContent = message;

        if (grade === 'A+') {
            retakeButton.classList.add('hidden');
            resultScreen.classList.remove('hidden');

        } else {
            retakeButton.classList.remove('hidden');
            resultScreen.classList.remove('hidden'); 
        }
    }

    function resetQuiz() {
        clearListenTimeout();

        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('lesson-content').classList.remove('hidden');
        
        document.getElementById('grade-display').classList.remove('grade-excellent', 'grade-good', 'grade-needs-work');

        if (takeQuizButton) {
            takeQuizButton.style.display = 'block';
            takeQuizButton.setAttribute('aria-expanded', 'false');
        }
    }
});
