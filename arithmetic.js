// Текущая задача и её ответ
let currentTask = '';
let correctAnswer = 0;

// Статистика
let stats = {
    total: 0,
    correct: 0,
    wrong: 0
};

// Генерация случайного числа в диапазоне
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация случайной математической задачи
function generateTask() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[getRandomNumber(0, 3)];
    
    let num1, num2;
    
    switch(operation) {
        case '+':
            num1 = getRandomNumber(1, 100);
            num2 = getRandomNumber(1, 100);
            correctAnswer = num1 + num2;
            break;
            
        case '-':
            num1 = getRandomNumber(1, 100);
            num2 = getRandomNumber(1, num1); // Чтобы результат был положительным
            correctAnswer = num1 - num2;
            break;
            
        case '*':
            num1 = getRandomNumber(1, 20);
            num2 = getRandomNumber(1, 10);
            correctAnswer = num1 * num2;
            break;
            
        case '/':
            // Генерируем примеры с целочисленным ответом
            num2 = getRandomNumber(2, 10);
            correctAnswer = getRandomNumber(2, 10);
            num1 = num2 * correctAnswer;
            break;
    }
    
    currentTask = `${num1} ${operation} ${num2}`;
    document.getElementById('task').textContent = currentTask + ' = ?';
    document.getElementById('result').textContent = '';
    
    // Сохраняем ответ с точностью до 2 знаков после запятой
    correctAnswer = parseFloat(correctAnswer.toFixed(2));
    
    return currentTask;
}

// Проверка ответа пользователя
function checkAnswer() {
    if (!currentTask) {
        alert('Сначала сгенерируйте задачу!');
        return;
    }
    
    const userAnswer = prompt(`Решите пример: ${currentTask}`, '');
    
    // Если пользователь нажал "Отмена"
    if (userAnswer === null) {
        return;
    }
    
    // Преобразуем ответ пользователя в число
    const userNumber = parseFloat(userAnswer.replace(',', '.'));
    
    // Проверяем, является ли ввод числом
    if (isNaN(userNumber)) {
        document.getElementById('result').innerHTML = 
            '<span class="incorrect">Ошибка: введите число!</span>';
        return;
    }
    
    // Обновляем статистику
    stats.total++;
    
    // Сравниваем ответы (с учетом возможной погрешности при делении)
    const isCorrect = Math.abs(userNumber - correctAnswer) < 0.01;
    
    if (isCorrect) {
        stats.correct++;
        document.getElementById('result').innerHTML = 
            `<span class="correct">✅ Верно! ${currentTask} = ${correctAnswer}</span>`;
    } else {
        stats.wrong++;
        document.getElementById('result').innerHTML = 
            `<span class="incorrect">❌ Неверно! ${currentTask} = ${correctAnswer}</span>`;
    }
    
    // Обновляем статистику на странице
    updateStats();
    
    // Автоматически генерируем следующую задачу через 1.5 секунды
    setTimeout(() => {
        generateTask();
    }, 1500);
}

// Обновление статистики
function updateStats() {
    document.getElementById('total').textContent = stats.total;
    document.getElementById('correct').textContent = stats.correct;
    document.getElementById('wrong').textContent = stats.wrong;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    generateTask();
    updateStats();
});