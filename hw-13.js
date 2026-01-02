// Получаем элементы DOM
const addBtn = document.getElementById("addBtn");
const addMultipleBtn = document.getElementById("addMultipleBtn");
const clearBtn = document.getElementById("clearBtn");
const elementsContainer = document.getElementById("elementsContainer");
const emptyMessage = document.getElementById("emptyMessage");
const elementCount = document.getElementById("elementCount");

let counter = 0; // Счётчик добавленных элементов

// Основная функция добавления нового элемента
function addNewElement(text = null) {
  counter++;

  // 1. Создаём новый элемент <p> с помощью createElement
  const newParagraph = document.createElement("p");

  // 2. Устанавливаем содержимое элемента
  if (text) {
    newParagraph.textContent = text;
  } else {
    newParagraph.textContent = `Новый абзац №${counter}`;
  }

  // 3. Добавляем CSS-класс для стилизации
  newParagraph.className = "new-element";

  // 4. Добавляем элемент в контейнер с помощью appendChild
  elementsContainer.appendChild(newParagraph);

  // 5. Скрываем сообщение "Элементов пока нет"
  if (counter === 1) {
    emptyMessage.style.display = "none";
  }

  // 6. Обновляем счётчик
  // updateCounter();

  // 7. Прокручиваем к новому элементу
  newParagraph.scrollIntoView({ behavior: "smooth", block: "nearest" });

  return newParagraph;
}

// Функция для показа уведомлений
function showNotification(message, isSuccess = true) {
  // Создаём временное уведомление
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${isSuccess ? "#4CAF50" : "#f44336"};
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            `;

  document.body.appendChild(notification);

  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-10px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Назначаем обработчики событий на кнопки
addBtn.addEventListener("click", () => {
  addNewElement();
  showNotification("Новый элемент добавлен!");
});

addMultipleBtn.addEventListener("click", addMultipleElements);
clearBtn.addEventListener("click", clearAllElements);

// Инструкция при загрузке
setTimeout(() => {
  showNotification('Нажмите "Добавить элемент" чтобы начать!');
}, 1000);
