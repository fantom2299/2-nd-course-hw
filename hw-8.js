// Задание 2  //

// Получаем элементы DOM с помощью querySelector
const targetText = document.querySelector("#target-text");
const colorButtons = document.querySelectorAll(".color-btn");
const styleButtons = document.querySelectorAll(".style-btn");
const randomColorBtn = document.querySelector("#random-color");
const randomStyleBtn = document.querySelector("#random-style");
const resetStylesBtn = document.querySelector("#reset-styles");
const rainbowModeBtn = document.querySelector("#rainbow-mode");

// Элементы для отображения информации
const currentColorElement = document.querySelector("#current-color");
const colorNameElement = document.querySelector("#color-name");
const fontSizeElement = document.querySelector("#font-size");
const fontWeightElement = document.querySelector("#font-weight");
const colorChangesElement = document.querySelector("#color-changes");
const totalChangesElement = document.querySelector("#total-changes");
const lastChangeElement = document.querySelector("#last-change");

// Переменные состояния
let colorChanges = 0;
let totalChanges = 0;
let isRainbowMode = false;
let rainbowInterval = null;
let currentFontSize = 16;
let currentStyles = {
  bold: false,
  italic: false,
  underline: false,
  shadow: false,
};

// Функция для обновления времени последнего изменения
function updateLastChangeTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  lastChangeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Функция для обновления статистики
function updateStats(type = "other") {
  if (type === "color") {
    colorChanges++;
  }
  totalChanges++;

  colorChangesElement.textContent = colorChanges;
  totalChangesElement.textContent = totalChanges;
  updateLastChangeTime();
}

// Функция для обновления информации о текущих стилях
function updateStyleInfo() {
  // Получаем текущие стили
  const currentColor = targetText.style.color || "#333333";
  const currentFontSize = targetText.style.fontSize || "16px";
  const fontWeight = targetText.style.fontWeight || "normal";

  // Обновляем отображение цвета
  currentColorElement.style.backgroundColor = currentColor;

  // Преобразуем цвет в читаемый формат
  const colorName = getColorName(currentColor);
  colorNameElement.textContent = `${currentColor} (${colorName})`;

  // Обновляем отображение размера шрифта
  fontSizeElement.textContent = currentFontSize;

  // Обновляем отображение начертания
  fontWeightElement.textContent = fontWeight;

  // Обновляем активные кнопки стилей
  styleButtons.forEach((button) => {
    const style = button.dataset.style;
    if (style === "bold") {
      button.classList.toggle("active", currentStyles.bold);
    } else if (style === "italic") {
      button.classList.toggle(
        "active",
        targetText.style.fontStyle === "italic"
      );
    } else if (style === "underline") {
      button.classList.toggle(
        "active",
        targetText.style.textDecoration === "underline"
      );
    } else if (style === "shadow") {
      button.classList.toggle("active", currentStyles.shadow);
    }
  });
}

// Функция для получения имени цвета
function getColorName(color) {
  const colorMap = {
    "#2196F3": "синий",
    "#4CAF50": "зеленый",
    "#FF9800": "оранжевый",
    "#9C27B0": "фиолетовый",
    "#F44336": "красный",
    "#FFEB3B": "желтый",
    "#333333": "черный",
    "#000000": "черный",
    "#FFFFFF": "белый",
  };

  return colorMap[color.toUpperCase()] || "пользовательский";
}

// Функция для изменения цвета текста
function changeTextColor(color, colorName) {
  // Добавляем анимацию
  targetText.classList.add("color-change");

  // Меняем цвет
  targetText.style.color = color;

  // Обновляем статистику
  updateStats("color");

  // Обновляем информацию о стилях
  updateStyleInfo();

  // Убираем анимацию через 0.5 секунды
  setTimeout(() => {
    targetText.classList.remove("color-change");
  }, 500);

  // Показываем уведомление
  showNotification(`Цвет изменен на ${colorName}`, color);
}

// Функция для применения стиля
function applyStyle(style) {
  switch (style) {
    case "bold":
      currentStyles.bold = !currentStyles.bold;
      targetText.style.fontWeight = currentStyles.bold ? "bold" : "normal";
      break;

    case "italic":
      const isItalic = targetText.style.fontStyle === "italic";
      targetText.style.fontStyle = isItalic ? "normal" : "italic";
      break;

    case "underline":
      const isUnderlined = targetText.style.textDecoration === "underline";
      targetText.style.textDecoration = isUnderlined ? "none" : "underline";
      break;

    case "size-up":
      currentFontSize += 2;
      targetText.style.fontSize = `${currentFontSize}px`;
      break;

    case "size-down":
      if (currentFontSize > 10) {
        currentFontSize -= 2;
        targetText.style.fontSize = `${currentFontSize}px`;
      }
      break;

    case "shadow":
      currentStyles.shadow = !currentStyles.shadow;
      if (currentStyles.shadow) {
        targetText.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
      } else {
        targetText.style.textShadow = "none";
      }
      break;
  }

  // Обновляем статистику
  updateStats();

  // Обновляем информацию о стилях
  updateStyleInfo();
}

// Функция для генерации случайного цвета
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функция для применения случайного цвета
function applyRandomColor() {
  const color = getRandomColor();
  changeTextColor(color, "случайный");

  // Анимация кнопки
  randomColorBtn.style.transform = "rotate(360deg)";
  randomColorBtn.style.transition = "transform 0.5s";

  setTimeout(() => {
    randomColorBtn.style.transform = "";
  }, 500);
}

// Функция для применения случайного стиля
function applyRandomStyle() {
  const styles = [
    "bold",
    "italic",
    "underline",
    "size-up",
    "size-down",
    "shadow",
  ];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];

  applyStyle(randomStyle);

  // Анимация кнопки
  randomStyleBtn.style.transform = "scale(0.9)";
  setTimeout(() => {
    randomStyleBtn.style.transform = "";
  }, 100);
}

// Функция для сброса всех стилей
function resetStyles() {
  // Сбрасываем все стили
  targetText.style.cssText = "";

  // Сбрасываем переменные состояния
  currentFontSize = 16;
  currentStyles = {
    bold: false,
    italic: false,
    underline: false,
    shadow: false,
  };

  // Останавливаем радужный режим если активен
  if (isRainbowMode) {
    toggleRainbowMode();
  }

  // Обновляем информацию о стилях
  updateStyleInfo();

  // Обновляем статистику
  updateStats();

  // Показываем уведомление
  showNotification("Все стили сброшены", "#333333");
}

// Функция для переключения радужного режима
function toggleRainbowMode() {
  isRainbowMode = !isRainbowMode;

  if (isRainbowMode) {
    // Включаем радужный режим
    targetText.classList.add("rainbow-text");
    rainbowModeBtn.innerHTML = '<i class="fas fa-stop"></i> Остановить радугу';
    rainbowModeBtn.style.background =
      "linear-gradient(to right, #333333, #666666)";

    // Запускаем интервал для плавной смены цветов
    let hue = 0;
    rainbowInterval = setInterval(() => {
      targetText.style.color = `hsl(${hue}, 100%, 50%)`;
      hue = (hue + 1) % 360;
      updateStyleInfo();
    }, 50);

    showNotification(
      "Радужный режим включен",
      "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
    );
  } else {
    // Выключаем радужный режим
    targetText.classList.remove("rainbow-text");
    rainbowModeBtn.innerHTML = '<i class="fas fa-rainbow"></i> Радужный режим';
    rainbowModeBtn.style.background =
      "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff)";

    clearInterval(rainbowInterval);
    showNotification("Радужный режим выключен", "#333333");
  }
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
        background: ${
          typeof color === "string" && color.startsWith("#")
            ? color
            : "linear-gradient(to right, #4a00e0, #8e2de2)"
        };
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 1.7s;
    `;

  // Добавляем на страницу
  document.body.appendChild(notification);

  // Удаляем через 2 секунды
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Добавляем CSS для анимации уведомлений
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Добавляем обработчики событий с помощью addEventListener

// Обработчики для кнопок цвета
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;
    const colorName = button.dataset.name;
    changeTextColor(color, colorName);

    // Анимация кнопки
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 100);
  });
});

// Обработчики для кнопок стилей
styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const style = button.dataset.style;
    applyStyle(style);

    // Анимация кнопки
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 100);
  });
});

// Обработчики для специальных кнопок
randomColorBtn.addEventListener("click", applyRandomColor);
randomStyleBtn.addEventListener("click", applyRandomStyle);
resetStylesBtn.addEventListener("click", resetStyles);
rainbowModeBtn.addEventListener("click", toggleRainbowMode);

// Добавляем управление с клавиатуры
document.addEventListener("keydown", (event) => {
  // 1-6 для выбора цвета
  if (event.code >= "Digit1" && event.code <= "Digit6") {
    const index = parseInt(event.code.slice(-1)) - 1;
    if (colorButtons[index]) {
      event.preventDefault();
      colorButtons[index].click();
    }
  }

  // Q-W для стилей (Q=жирный, W=курсив и т.д.)
  if (event.code === "KeyQ") {
    event.preventDefault();
    document.querySelector('[data-style="bold"]').click();
  }
  if (event.code === "KeyW") {
    event.preventDefault();
    document.querySelector('[data-style="italic"]').click();
  }
  if (event.code === "KeyE") {
    event.preventDefault();
    document.querySelector('[data-style="underline"]').click();
  }

  // R для случайного цвета
  if (event.code === "KeyR") {
    event.preventDefault();
    applyRandomColor();
  }

  // T для сброса
  if (event.code === "KeyT") {
    event.preventDefault();
    resetStyles();
  }

  // Y для радужного режима
  if (event.code === "KeyY") {
    event.preventDefault();
    toggleRainbowMode();
  }
});

// Инициализация
updateStyleInfo();
updateLastChangeTime();

// Информация в консоль для разработчика
console.log("Задание 2: Изменение стиля элемента");
console.log("Используемые элементы:");
console.log("- Текст:", targetText);
console.log("- Кнопки цвета:", colorButtons.length);
console.log("- Кнопки стилей:", styleButtons.length);
console.log("\nУправление с клавиатуры:");
console.log("- 1-6: Выбор цвета (1-синий, 2-зеленый, ...)");
console.log("- Q: Жирный текст");
console.log("- W: Курсив");
console.log("- E: Подчеркнутый");
console.log("- R: Случайный цвет");
console.log("- T: Сбросить стили");
console.log("- Y: Радужный режим");
