// Задание 3  //


// Получаем элементы DOM с помощью querySelector
const targetHeading = document.querySelector("#target-heading");
const textButtons = document.querySelectorAll(".text-btn");
const effectButtons = document.querySelectorAll(".effect-btn");
const customTextInput = document.querySelector("#custom-text");
const applyCustomBtn = document.querySelector("#apply-custom");
const resetTextBtn = document.querySelector("#reset-text");
const copyTextBtn = document.querySelector("#copy-text");
const animateTextBtn = document.querySelector("#animate-text");
const clearHistoryBtn = document.querySelector("#clear-history");

// Элементы для отображения информации
const textLengthElement = document.querySelector("#text-length");
const changeCountElement = document.querySelector("#change-count");
const lastChangeElement = document.querySelector("#last-change");
const charCountElement = document.querySelector("#char-count");
const historyList = document.querySelector("#history-list");
const notification = document.querySelector("#notification");
const notificationText = document.querySelector("#notification-text");

// Переменные состояния
let changeCount = 0;
let history = JSON.parse(localStorage.getItem("textHistory")) || [];
const originalText = "Исходный текст заголовка";

// Массив случайных текстов
const randomTexts = [
  "Привет, мир!",
  "JavaScript - это мощно!",
  "Динамическое изменение текста работает!",
  "Добро пожаловать!",
  "Веб-разработка - это интересно",
  "Изучайте JavaScript каждый день",
  "Код изменяет мир",
  "Текст был успешно изменен",
  "Программирование - это магия",
  "Создавайте удивительные вещи",
];

// Инициализация
function init() {
  updateTextInfo();
  updateCharCounter();
  loadHistory();

  // Устанавливаем исходный текст
  targetHeading.innerHTML = `<i class="fas fa-quote-left"></i>${originalText}<i class="fas fa-quote-right"></i>`;
}

// Функция для обновления информации о тексте
function updateTextInfo() {
  // Получаем только текст (без HTML тегов)
  const text = targetHeading.textContent || targetHeading.innerText;
  textLengthElement.textContent = text.length;
  changeCountElement.textContent = changeCount;
}


// Функция для обновления счетчика символов
function updateCharCounter() {
  const length = customTextInput.value.length;
  charCountElement.textContent = length;

  if (length > 100) {
    charCountElement.style.color = "#f44336";
    customTextInput.style.borderColor = "#f44336";
  } else {
    charCountElement.style.color = "#666";
    customTextInput.style.borderColor = "#e0e0e0";
  }
}

// Функция для показа уведомления
function showNotification(message, isSuccess = true) {
  notificationText.textContent = message;
  notification.style.background = isSuccess ? "#4CAF50" : "#f44336";
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}


// Функция для изменения текста
function changeText(newText, showNotificationMsg = true) {
  // Добавляем анимацию изменения
  targetHeading.classList.add("text-change");

  // Меняем текст с сохранением иконок
  targetHeading.innerHTML = `<i class="fas fa-quote-left"></i>${newText}<i class="fas fa-quote-right"></i>`;

  // Увеличиваем счетчик изменений
  // changeCount++;

  // Обновляем информацию
  updateTextInfo();
  updateLastChangeTime();

  // Сохраняем в историю
  saveToHistory(newText);

  // Показываем уведомление
  if (showNotificationMsg) {
    showNotification(
      `Текст изменен на: "${newText.substring(0, 30)}${
        newText.length > 30 ? "..." : ""
      }"`
    );
  }
}

// Функция для применения эффекта к тексту
function applyEffect(effect) {
  const currentText = targetHeading.textContent;
  let newText = currentText;

  switch (effect) {
    case "reverse":
      newText = currentText.split("").reverse().join("");
      showNotification("Текст перевернут!");
      break;

    case "uppercase":
      newText = currentText.toUpperCase();
      showNotification("Текст в верхнем регистре!");
      break;

    case "lowercase":
      newText = currentText.toLowerCase();
      showNotification("Текст в нижнем регистре!");
      break;

    case "random":
      const randomIndex = Math.floor(Math.random() * randomTexts.length);
      newText = randomTexts[randomIndex];
      showNotification("Установлен случайный текст!");
      break;
  }

  changeText(newText, false);
}

// Функция для применения пользовательского текста
function applyCustomText() {
  const text = customTextInput.value.trim();

  if (!text) {
    showNotification("Введите текст для изменения!", false);
    customTextInput.focus();
    return;
  }

  if (text.length > 100) {
    showNotification("Текст слишком длинный! Максимум 100 символов.", false);
    return;
  }

  changeText(text);
  customTextInput.value = "";
  updateCharCounter();
}

// Функция для сброса текста
function resetText() {
  changeText(originalText);
  showNotification("Текст сброшен до исходного");
}


// Функция для анимации текста
function animateText() {
  const originalContent = targetHeading.innerHTML;

  // Сохраняем исходный текст
  const fullText = targetHeading.textContent;
  let currentIndex = 0;

  // Очищаем текст
  targetHeading.innerHTML =
    '<i class="fas fa-quote-left"></i><i class="fas fa-quote-right"></i>';

  // Меняем кнопку
  animateTextBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Анимация...';
  animateTextBtn.disabled = true;
}

// Добавляем обработчики событий с помощью addEventListener

// Обработчики для кнопок текста
textButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.dataset.text;
    changeText(text);

    // Анимация кнопки
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 100);
  });
});

// Обработчики для кнопок эффектов
effectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const effect = button.dataset.effect;
    applyEffect(effect);

    // Анимация кнопки
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 100);
  });
});

// Обработчики для пользовательского ввода
customTextInput.addEventListener("input", updateCharCounter);
customTextInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    applyCustomText();
  }
});

applyCustomBtn.addEventListener("click", applyCustomText);

// Обработчики для action кнопок
resetTextBtn.addEventListener("click", resetText);
copyTextBtn.addEventListener("click", copyText);
animateTextBtn.addEventListener("click", animateText);


// Добавляем управление с клавиатуры
document.addEventListener("keydown", (event) => {
  // Ctrl + 1-4 для стандартных текстов
  if (event.ctrlKey && event.code >= "Digit1" && event.code <= "Digit4") {
    const index = parseInt(event.code.slice(-1)) - 1;
    if (textButtons[index]) {
      event.preventDefault();
      textButtons[index].click();
    }
  }


  // Ctrl + Enter для пользовательского текста
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    applyCustomText();
  }

  // Ctrl + Z для сброса
  if (event.ctrlKey && event.code === "KeyZ") {
    event.preventDefault();
    resetText();
  }

  // Ctrl + C для копирования
  if (event.ctrlKey && event.code === "KeyC") {
    event.preventDefault();
    copyText();
  }
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", init);