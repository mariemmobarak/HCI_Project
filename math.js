let currentQuestionIndex = 0;
let score = 0;
const TOTAL_QUESTIONS = 5;

const quizQuestions = [
    { num1: 3, num2: 4, answer: 12 },
    { num1: 7, num2: 2, answer: 14 },
    { num1: 5, num2: 5, answer: 25 },
    { num1: 9, num2: 1, answer: 9 },
    { num1: 6, num2: 3, answer: 18 }
];

document.addEventListener('DOMContentLoaded', () => {
    const lessonContent = document.getElementById('lesson-content');
    const quizContainer = document.getElementById('quiz-container');
    const takeQuizButton = document.getElementById('take-quiz-button');
    const submitAnswerButton = document.getElementById('submit-answer-button');
    const retakeQuizButton = document.getElementById('retake-quiz-button');

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
    
    document.getElementById('answer-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
        }
    });

 
    function startQuiz() {
        // Hide lesson, show quiz
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
        const question = quizQuestions[currentQuestionIndex];
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const answerInput = document.getElementById('answer-input');

        document.getElementById('question-text').textContent = `${question.num1} × ${question.num2} = ?`;
        answerInput.value = ''; // Clear input field
        answerInput.focus(); // Focus the input field
        document.getElementById('feedback-message').classList.add('hidden');

        // Update Progress Bar
        const progress = ((currentQuestionIndex) / TOTAL_QUESTIONS) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${TOTAL_QUESTIONS}`;
    }


    function checkAnswer() {
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
            setTimeout(nextQuestion, 800);
        } else {
            feedbackMessage.textContent = `Wrong! The answer is ${question.answer}.`;
            feedbackMessage.classList.add('feedback-wrong');
            setTimeout(nextQuestion, 1500); 
        }
    }

    function nextQuestion() {
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
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('lesson-content').classList.remove('hidden');
        
        document.getElementById('grade-display').classList.remove('grade-excellent', 'grade-good', 'grade-needs-work');

        if (takeQuizButton) {
            takeQuizButton.style.display = 'block';
            takeQuizButton.setAttribute('aria-expanded', 'false');
        }
    }
});
