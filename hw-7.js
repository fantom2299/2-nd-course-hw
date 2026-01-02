// Задание 1  //

// Получаем элементы DOM с помощью querySelector
const heading = document.querySelector("#target-heading");
const toggleButton = document.querySelector("#toggle-btn");
const resetButton = document.querySelector("#reset-btn");
const clickCountElement = document.querySelector("#click-count");
const statusElement = document.querySelector("#status-text");
const timeDisplay = document.querySelector("#time-display");
const methodButtons = document.querySelectorAll(".method-btn");
const methodInfo = document.querySelector("#method-info");

// Переменные состояния
let clickCount = 0;
let isVisible = true;
let currentMethod = "class"; // Метод по умолчанию: переключение CSS-класса

// Функция для обновления времени
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Функция для обновления статистики
function updateStats() {
  clickCountElement.textContent = clickCount;
  statusElement.textContent = isVisible ? "Видимый" : "Скрытый";
  statusElement.style.color = isVisible ? "#00b09b" : "#ff416c";
}

// Функция для обновления кнопки
function updateButton() {
  if (isVisible) {
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть текст';
    toggleButton.style.background =
      "linear-gradient(to right, #ff416c, #ff4b2b)";
  } else {
    toggleButton.innerHTML = '<i class="fas fa-eye"></i> Показать текст';
    toggleButton.style.background =
      "linear-gradient(to right, #00b09b, #96c93d)";
  }
}

// Функция для скрытия/показа с помощью CSS-класса (основной метод)
function toggleWithClass() {
  if (isVisible) {
    heading.classList.remove("visible");
    heading.classList.add("hidden");
  } else {
    heading.classList.remove("hidden");
    heading.classList.add("visible");
  }
}

// Функция для скрытия/показа с помощью display
function toggleWithDisplay() {
  heading.style.display = isVisible ? "none" : "flex";
}

// Функция для скрытия/показа с помощью visibility
function toggleWithVisibility() {
  if (isVisible) {
    heading.classList.remove("visible");
    heading.classList.add("visibility-hidden");
  } else {
    heading.classList.remove("visibility-hidden");
    heading.classList.add("visible");
  }
}

// Функция для скрытия/показа с помощью opacity
function toggleWithOpacity() {
  if (isVisible) {
    heading.classList.remove("visible");
    heading.classList.add("opacity-zero");
  } else {
    heading.classList.remove("opacity-zero");
    heading.classList.add("visible");
  }
}

function toggleVisibility() {
  clickCount++;

  // 1. Применяем стили для ТЕКУЩЕГО состояния
  if (isVisible) {
    // Сейчас видимый → скрываем
    heading.classList.remove("visible");
    heading.classList.add("hidden");
  } else {
    // Сейчас скрытый → показываем
    heading.classList.remove("hidden");
    heading.classList.add("visible");
  }

  // 2. ТОЛЬКО ПОСЛЕ этого меняем состояние
  isVisible = !isVisible;

  // 3. Обновляем интерфейс
  updateButton();
  updateStats();
}

// Добавляем анимацию для кнопки
toggleButton.style.transform = "scale(0.95)";
setTimeout(() => {
  toggleButton.style.transform = "";
}, 100);

// Функция для сброса состояния
function resetState() {
  // Сбрасываем состояние
  isVisible = true;
  clickCount = 0;

  // Сбрасываем стили заголовка
  heading.className = "target-heading visible";
  heading.style.display = "";

  // Обновляем интерфейс
  updateButton();
  updateStats();

  // Анимация сброса
  resetButton.style.transform = "scale(0.95)";
  setTimeout(() => {
    resetButton.style.transform = "";
  }, 100);

  // Уведомление
  showNotification("Состояние сброшено!", "#00b09b");
}

// Функция для изменения метода скрытия
function changeMethod(method) {
  // Сбрасываем все активные кнопки
  methodButtons.forEach((btn) => btn.classList.remove("active"));

  // Активируем выбранную кнопку
  const activeButton = document.querySelector(`[data-method="${method}"]`);
  activeButton.classList.add("active");

  // Сохраняем выбранный метод
  currentMethod = method;

  // Обновляем информацию о методе
  const methodNames = {
    display: "display: none",
    visibility: "visibility: hidden",
    opacity: "opacity: 0",
    class: "Переключение CSS-класса",
  };

  const methodDescriptions = {
    display: "Элемент полностью удаляется из потока документа",
    visibility: "Элемент остается в потоке, но не виден",
    opacity: "Элемент становится прозрачным, но остается кликабельным",
    class: "Рекомендуемый метод с CSS-переходами",
  };

  methodInfo.textContent = `Текущий метод: ${methodNames[method]} — ${methodDescriptions[method]}`;

  // Сбрасываем видимость при смене метода
  resetState();

  // Показываем уведомление
  showNotification(`Метод изменен: ${methodNames[method]}`, "#8e2de2");
}

// Функция для показа уведомления
function showNotification(message, color) {
  // Создаем элемент уведомления
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;

  // Добавляем на страницу
  document.body.appendChild(notification);

  // Удаляем через 2 секунды
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Функция для звукового эффекта (опционально)
function playClickSound() {
  // Создаем простой звуковой эффект с помощью Web Audio API
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = isVisible ? 800 : 400;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Если Web Audio API не поддерживается, игнорируем
    console.log("Web Audio API не поддерживается");
  }
}

// Добавляем обработчики событий с помощью addEventListener

// Основная кнопка переключения
toggleButton.addEventListener("click", toggleVisibility);

// Кнопка сброса
resetButton.addEventListener("click", resetState);

// Кнопки выбора метода
methodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeMethod(button.dataset.method);
  });
});

// Добавляем обработку клавиатуры
document.addEventListener("keydown", (event) => {
  // Space или Enter для переключения
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    toggleVisibility();
  }

  // R для сброса
  if (event.code === "KeyR" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    resetState();
  }

  // 1-4 для выбора метода
  if (event.code >= "Digit1" && event.code <= "Digit4") {
    const methods = ["class", "display", "visibility", "opacity"];
    const index = parseInt(event.code.slice(-1)) - 1;
    if (methods[index]) {
      changeMethod(methods[index]);
    }
  }
});

// Инициализация
updateStats();
updateButton();

// Информация в консоль для разработчика
console.log("Элементы найдены:");
console.log("- Заголовок:", heading);
console.log("- Кнопка переключения:", toggleButton);
console.log("- Кнопка сброса:", resetButton);
console.log("\nУправление с клавиатуры:");
console.log("- Пробел/Enter: переключить видимость");
console.log("- Ctrl+R: сбросить состояние");
console.log(
  "- 1-4: выбрать метод скрытия (1 - CSS-класс, 2 - display, 3 - visibility, 4 - opacity)"
);







// Задание 4  //

// Задание 5  //

// Задание 6  //
