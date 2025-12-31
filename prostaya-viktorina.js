// Массив вопросов викторины
const quiz = [
    {
        question: "Какой цвет небо?",
        options: ["1. Красный", "2. Синий", "3. Зеленый"],
        correctAnswer: 2 // номер правильного ответа
    },
    {
        question: "Сколько дней в неделе?",
        options: ["1. Шесть", "2. Семь", "3. Восемь"],
        correctAnswer: 2
    },
    {
        question: "Сколько у человека пальцев на одной руке?",
        options: ["1. Четыре", "2. Пять", "3. Шесть"],
        correctAnswer: 2
    },
    {
        question: "Столица России?",
        options: ["1. Санкт-Петербург", "2. Москва", "3. Казань"],
        correctAnswer: 2
    },
    {
        question: "Сколько планет в Солнечной системе?",
        options: ["1. Восемь", "2. Девять", "3. Десять"],
        correctAnswer: 1
    }
];

// Переменные для состояния викторины
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let quizCompleted = false;

// DOM элементы
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const maxScoreSpan = document.getElementById('max-score');
const progressFill = document.getElementById('progress-fill');

const correctAnswersSpan = document.getElementById('correct-answers');
const totalQuestionsResultSpan = document.getElementById('total-questions-result');
const percentageSpan = document.getElementById('percentage');
const resultMessage = document.getElementById('result-message');
const answersReview = document.getElementById('answers-review');

// Инициализация
function init() {
    totalQuestionsSpan.textContent = quiz.length;
    totalQuestionsResultSpan.textContent = quiz.length;
    maxScoreSpan.textContent = quiz.length;
    
    // Обработчики событий
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);
    shareBtn.addEventListener('click', shareResults);
    
    // Инициализация ответов пользователя
    userAnswers = new Array(quiz.length).fill(null);
}

// Начать викторину
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion(currentQuestionIndex);
    updateProgress();
}

// Показать вопрос
function showQuestion(index) {
    const question = quiz[index];
    
    // Обновляем текст вопроса
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = index + 1;
    
    // Очищаем контейнер с вариантами ответов
    optionsContainer.innerHTML = '';
    
    // Создаем кнопки для каждого варианта ответа
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[index] === optionIndex + 1) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-number">${optionIndex + 1}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectAnswer(optionIndex + 1));
        optionsContainer.appendChild(optionElement);
    });
    
    // Обновляем состояние кнопок навигации
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === quiz.length - 1 ? 'Последний вопрос' : 'Следующий вопрос';
    
    // Показываем/скрываем кнопку завершения
    submitBtn.style.display = index === quiz.length - 1 ? 'flex' : 'none';
    
    updateProgress();
}

// Выбрать ответ
function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    
    // Обновляем отображение выбранного ответа
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index + 1 === answer) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Показать предыдущий вопрос
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

// Показать следующий вопрос
function showNextQuestion() {
    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

// Обновить прогресс
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quiz.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Рассчитываем текущий счет
    let tempScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quiz[index].correctAnswer) {
            tempScore++;
        }
    });
    score = tempScore;
    scoreSpan.textContent = score;
}

// Отправить викторину
function submitQuiz() {
    // Проверяем, на все ли вопросы отвечено
    const unansweredQuestions = userAnswers.filter(answer => answer === null).length;
    
    if (unansweredQuestions > 0) {
        if (!confirm(`Вы ответили не на все вопросы. ${unansweredQuestions} вопрос(ов) остались без ответа. Завершить викторину?`)) {
            return;
        }
    }
    
    // Рассчитываем финальный счет
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quiz[index].correctAnswer) {
            score++;
        }
    });
    
    // Переходим к экрану результатов
    showResults();
}

// Показать результаты
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Обновляем статистику
    correctAnswersSpan.textContent = score;
    const percentage = Math.round((score / quiz.length) * 100);
    percentageSpan.textContent = `${percentage}%`;
    
    // Показываем сообщение в зависимости от результата
    let message = '';
    let resultTitle = '';
    let iconColor = '#FFD700';
    
    if (percentage === 100) {
        message = 'Потрясающе! Вы знаток! Все ответы правильные! 🎉';
        resultTitle = 'Идеальный результат!';
    } else if (percentage >= 80) {
        message = 'Отличный результат! Вы хорошо справились! 👍';
        resultTitle = 'Очень хорошо!';
    } else if (percentage >= 60) {
        message = 'Хороший результат! Есть куда стремиться! 💪';
        resultTitle = 'Неплохо!';
    } else if (percentage >= 40) {
        message = 'Неплохо, но можно лучше! Попробуйте еще раз! ✨';
        resultTitle = 'Нормально!';
    } else {
        message = 'Попробуйте еще раз! Уверен, в следующий раз получится лучше! 🌟';
        resultTitle = 'Попробуйте снова!';
        iconColor = '#FF6B6B';
    }
    
    document.getElementById('result-title').textContent = resultTitle;
    document.getElementById('result-icon').style.color = iconColor;
    resultMessage.textContent = message;
    
    // Показываем обзор ответов
    showAnswersReview();
}

// Показать обзор ответов
function showAnswersReview() {
    answersReview.innerHTML = '';
    
    quiz.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        let answerText = 'Не отвечено';
        if (userAnswer !== null) {
            answerText = question.options[userAnswer - 1];
        }
        
        const correctAnswerText = question.options[question.correctAnswer - 1];
        
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${question.question}</div>
            <div class="review-answer">
                <i class="fas fa-user"></i>
                Ваш ответ: <span class="${isCorrect ? 'review-correct' : 'review-incorrect'}">${answerText}</span>
            </div>
            ${!isCorrect ? `
                <div class="review-answer">
                    <i class="fas fa-check-circle"></i>
                    Правильный ответ: <span class="review-correct">${correctAnswerText}</span>
                </div>
            ` : ''}
            <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✓ Правильно' : '✗ Неправильно'}
            </div>
        `;
        
        answersReview.appendChild(reviewItem);
    });
}

// Начать викторину заново
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quiz.length).fill(null);
    score = 0;
    
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // Сброс отображения
    scoreSpan.textContent = '0';
    updateProgress();
}

// Поделиться результатами
function shareResults() {
    const shareText = `Я прошел викторину и набрал ${score} из ${quiz.length} правильных ответов! (${
        Math.round((score / quiz.length) * 100)
    }%) Попробуй и ты!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Результат викторины',
            text: shareText,
            url: window.location.href
        })
        .then(() => console.log('Успешно поделились'))
        .catch(error => console.log('Ошибка при публикации:', error));
    } else {
        // Копирование в буфер обмена, если Web Share API не поддерживается
        navigator.clipboard.writeText(shareText)
            .then(() => {
                alert('Результат скопирован в буфер обмена! Поделитесь им с друзьями!');
            })
            .catch(err => {
                console.error('Ошибка копирования: ', err);
                alert('Скопируйте текст вручную:\n' + shareText);
            });
    }
}

// Версия с prompt (для сравнения)
function runPromptVersion() {
    let correctCount = 0;
    
    alert('Добро пожаловать в викторину! Ответьте на 3 вопроса.');
    
    quiz.forEach((question, index) => {
        const questionText = `Вопрос ${index + 1}: ${question.question}\n\n${question.options.join('\n')}`;
        const userAnswer = parseInt(prompt(questionText));
        
        if (userAnswer === question.correctAnswer) {
            correctCount++;
            alert('Правильно! ✅');
        } else {
            alert(`Неправильно! ❌ Правильный ответ: ${question.correctAnswer}`);
        }
    });
    
    alert(`Викторина завершена!\n\nПравильных ответов: ${correctCount} из ${quiz.length}`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Для демонстрации версии с prompt, можно раскомментировать следующую строку:
// runPromptVersion();