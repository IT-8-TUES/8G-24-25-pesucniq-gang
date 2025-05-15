let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
const urlParams = new URLSearchParams(window.location.search);
const questionCount = parseInt(urlParams.get('questions')) || 10; 
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const nextButton = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress');
const timerDisplay = document.getElementById('timer');
const quizContainer = document.querySelector('.quiz-container');
const resultsContainer = document.querySelector('.results-container');
const finalScore = document.getElementById('final-score');
const correctAnswers = document.getElementById('correct-answers');
const totalQuestions = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');
const allQuestions = [
    {
        question: "Which artist released the hit song 'Shape of You' in 2017?",
        options: ["Ed Sheeran", "Justin Bieber", "Shawn Mendes", "Charlie Puth"],
        correctAnswer: 0
    },
    {
        question: "What is the name of the band that performed 'Sweet Child O' Mine'?",
        options: ["Metallica", "Guns N' Roses", "AC/DC", "Aerosmith"],
        correctAnswer: 1
    },
    {
        question: "Which of these songs was NOT performed by Michael Jackson?",
        options: ["Billie Jean", "Thriller", "Purple Rain", "Beat It"],
        correctAnswer: 2
    },
    {
        question: "Who is known as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Freddie Mercury", "John Lennon"],
        correctAnswer: 1
    },
    {
        question: "Which band wrote the song 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
        correctAnswer: 1
    },
    {
        question: "What year did The Beatles release their album 'Abbey Road'?",
        options: ["1967", "1968", "1969", "1970"],
        correctAnswer: 2
    },
    {
        question: "Which artist has the most Grammy Awards of all time?",
        options: ["Beyoncé", "Michael Jackson", "Stevie Wonder", "Quincy Jones"],
        correctAnswer: 0
    },
    {
        question: "What is the best-selling album of all time?",
        options: ["Thriller - Michael Jackson", "Back in Black - AC/DC", "The Dark Side of the Moon - Pink Floyd", "Their Greatest Hits - Eagles"],
        correctAnswer: 0
    },
    {
        question: "Which of these instruments is NOT typically found in a rock band?",
        options: ["Electric Guitar", "Drums", "Violin", "Bass Guitar"],
        correctAnswer: 2
    },
    {
        question: "Who wrote the song 'Imagine'?",
        options: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"],
        correctAnswer: 1
    }
];
function getRandomQuestions(count) {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
const questions = getRandomQuestions(questionCount);
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    updateProgress();
}
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    if (timeLeft > 0) {
        startTimer();
    }
}
function selectOption(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
        option.classList.remove('selected');
    });
    options[selectedIndex].classList.add('selected');
    if (selectedIndex === question.correctAnswer) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correctAnswer].classList.add('correct');
    }
    nextButton.disabled = false;
    if (timer) {
        clearInterval(timer);
    }
}
function startTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timeLeft = 30; 
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}
function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}
function handleTimeUp() {
    const options = document.querySelectorAll('.option');
    const question = questions[currentQuestionIndex];
    options.forEach(option => {
        option.disabled = true;
    });
    options[question.correctAnswer].classList.add('correct');
    nextButton.disabled = false;
}
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}
function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    finalScore.textContent = score;
    correctAnswers.textContent = score;
    totalQuestions.textContent = questions.length;
}
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        updateProgress();
        nextButton.disabled = true;
    } else {
        showResults();
    }
});
restartButton.addEventListener('click', () => {
    resultsContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    initQuiz();
});
initQuiz(); 