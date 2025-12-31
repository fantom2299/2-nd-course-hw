// скрипт для Угадай число

// Глобальные переменные игры (должны быть доступны везде)
let secretNumber;
let attempts;
let gameOver;
const maxNumber = 100;

// Инициализация новой игры
function initGame() {
  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;
  gameOver = false;
  document.getElementById("message").innerHTML = "";
  document.getElementById("message").className = "";
  document.getElementById("attempts").textContent = "Попыток: 0";
  document.getElementById("history").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").focus();

  console.log(`Загаданное число (для отладки): ${secretNumber}`);
}

// Проверка предположения пользователя
function checkGuess() {
  if (gameOver) {
    showMessage("Игра окончена! Начните новую игру.", "hint");
    return;
  }

  const input = document.getElementById("guessInput");
  const guess = parseInt(input.value);

  // Проверка валидности ввода
  if (isNaN(guess) || guess < 1 || guess > maxNumber) {
    showMessage(`Пожалуйста, введите число от 1 до ${maxNumber}`, "hint");
    input.value = "";
    input.focus();
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = `Попыток: ${attempts}`;

  // Добавляем в историю
  addToHistory(guess);

  // Проверяем угадал ли пользователь
  if (guess === secretNumber) {
    gameOver = true;
    let message = `🎉 Поздравляю! Вы угадали число ${secretNumber}!`;
    message += `<br>Количество попыток: ${attempts}`;

    // Оценка результата
    if (attempts <= 5) {
      message += "<br>Отличный результат! Вы настоящий угадыватель!";
    } else if (attempts <= 10) {
      message += "<br>Хороший результат!";
    } else {
      message += "<br>Попробуйте еще раз, сможете лучше!";
    }

    // Добавляем кнопку для быстрого старта новой игры
    message += `<br><br><button onclick="newGame()" style="padding: 8px 16px; font-size: 14px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">Сыграть еще раз</button>`;

    showMessage(message, "success");
  } else if (guess < secretNumber) {
    showMessage(
      `Мое число <span class="hint">БОЛЬШЕ</span> чем ${guess}`,
      "hint"
    );
  } else {
    showMessage(
      `Мое число <span class="hint">МЕНЬШЕ</span> чем ${guess}`,
      "hint"
    );
  }

  input.value = "";
  input.focus();
}

// Показать сообщение
function showMessage(text, className) {
  const messageEl = document.getElementById("message");
  messageEl.innerHTML = text;
  messageEl.className = className;
}

// Добавить попытку в историю
function addToHistory(guess) {
  const historyEl = document.getElementById("history");
  const span = document.createElement("span");
  span.textContent = guess;
  span.style.display = "inline-block";
  span.style.padding = "5px 10px";
  span.style.margin = "3px";
  span.style.borderRadius = "3px";
  span.style.backgroundColor =
    guess === secretNumber
      ? "#4CAF50"
      : guess < secretNumber
      ? "#FF9800"
      : "#2196F3";
  span.style.color = "white";
  span.style.fontWeight = "bold";

  historyEl.appendChild(span);

  // Прокрутка к последнему элементу
  historyEl.scrollLeft = historyEl.scrollWidth;
}

// Новая игра
function newGame() {
  initGame();
}

// Обработка нажатия Enter
document
  .getElementById("guessInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

// Запуск игры при загрузке страницы
window.onload = initGame;

// Дополнительные функции для консоли (для разработчиков)
console.log('Игра "Угадай число" загружена!');
console.log("Для отладки можно использовать команды:");
console.log("showSecret() - показать загаданное число");
console.log("setSecret(num) - установить конкретное число");

// Функция для отладки - показать секретное число
window.showSecret = function () {
  console.log(`Секретное число: ${secretNumber}`);
  alert(`Секретное число: ${secretNumber} (только для отладки!)`);
};

// Функция для отладки - установить конкретное число
window.setSecret = function (num) {
  if (num >= 1 && num <= maxNumber) {
    secretNumber = num;
    console.log(`Теперь загаданное число: ${secretNumber}`);
    showMessage(`Число изменено на ${secretNumber} (отладка)`, "hint");
  }
};