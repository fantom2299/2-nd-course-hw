// Получаем элементы DOM
const removeBtn = document.getElementById("removeBtn");
const removeAllBtn = document.getElementById("removeAllBtn");
const resetBtn = document.getElementById("resetBtn");
const elementsContainer = document.getElementById("elementsContainer");
const statusElement = document.getElementById("status");
const descriptionCount = document.getElementById("descriptionCount");
const removedHistory = document.getElementById("removedHistory");
const removedList = document.getElementById("removedList");

// Массивы для хранения состояния
let removedElements = [];
let originalElements = [];

// Сохраняем исходное состояние при загрузке
function saveOriginalState() {
  originalElements = [];
  const allParagraphs = elementsContainer.querySelectorAll("p");
  allParagraphs.forEach((p) => {
    originalElements.push({
      id: p.id,
      className: p.className,
      textContent: p.textContent,
      html: p.outerHTML,
    });
  });
}

// Функция для обновления счётчика
function updateCounter() {
  const descriptionElements =
    elementsContainer.querySelectorAll("p.description");
  descriptionCount.textContent = descriptionElements.length;

  // Обновляем статус
  if (descriptionElements.length === 0) {
    statusElement.textContent = 'Элементов с классом "description" больше нет!';
    statusElement.className = "status error";
  } else {
    statusElement.textContent = `Готов к удалению. Первый элемент: "${descriptionElements[0].textContent.substring(
      0,
      30
    )}..."`;
    statusElement.className = "status info";

    // Подсвечиваем следующий элемент для удаления
    highlightNextElement();
  }
}

// Функция для подсветки следующего элемента для удаления
function highlightNextElement() {
  // Убираем подсветку у всех элементов
  const allElements = elementsContainer.querySelectorAll("p");
  allElements.forEach((el) => el.classList.remove("highlight"));

  // Подсвечиваем первый элемент с классом description
  const firstDescription = elementsContainer.querySelector("p.description");
  if (firstDescription) {
    firstDescription.classList.add("highlight");
  }
}

// Основная функция удаления первого элемента с классом description
function removeFirstDescription() {
  // 1. Используем querySelector для поиска первого элемента с классом description
  const firstDescription = elementsContainer.querySelector("p.description");

  // Проверяем, есть ли такой элемент
  if (!firstDescription) {
    statusElement.textContent = 'Элементов с классом "description" больше нет!';
    statusElement.className = "status error";
    showNotification(
      'Нечего удалять! Элементов с классом "description" не осталось.',
      false
    );
    return;
  }

  // 2. Сохраняем информацию об удаляемом элементе
  removedElements.unshift({
    id: firstDescription.id,
    className: firstDescription.className,
    textContent: firstDescription.textContent,
    timestamp: new Date().toLocaleTimeString(),
    html: firstDescription.outerHTML,
  });

  // 3. Добавляем анимацию удаления
  firstDescription.classList.add("removing");

  // 4. Используем метод remove() для удаления элемента после задержки
  setTimeout(() => {
    firstDescription.remove();

    // 5. Обновляем счётчик
    updateCounter();

    // 6. Обновляем историю удалений
    updateRemovedHistory();

    // 7. Показываем уведомление
    const text = firstDescription.textContent.substring(0, 30);
    showNotification(
      `Удалён элемент: "${text}${
        firstDescription.textContent.length > 30 ? "..." : ""
      }"`
    );
  }, 300);
}

// Функция для удаления всех элементов с классом description
function removeAllDescriptions() {
  const descriptionElements =
    elementsContainer.querySelectorAll("p.description");

  if (descriptionElements.length === 0) {
    showNotification("Нечего удалять!", false);
    return;
  }

  if (
    !confirm(
      `Вы уверены, что хотите удалить все ${descriptionElements.length} элементов с классом "description"?`
    )
  ) {
    return;
  }

  // Сохраняем все элементы перед удалением
  descriptionElements.forEach((el) => {
    removedElements.unshift({
      id: el.id,
      className: el.className,
      textContent: el.textContent,
      timestamp: new Date().toLocaleTimeString(),
      html: el.outerHTML,
    });

    // Анимация удаления
    el.classList.add("removing");
  });

  // Удаляем все элементы после анимации
  setTimeout(() => {
    descriptionElements.forEach((el) => el.remove());
    updateCounter();
    updateRemovedHistory();
    showNotification(`Удалено ${descriptionElements.length} элементов!`);
  }, 500);
}

// Функция для восстановления всех элементов
function resetAllElements() {
  if (originalElements.length === 0) {
    showNotification("Нет сохранённых элементов для восстановления", false);
    return;
  }

  // Очищаем контейнер
  elementsContainer.innerHTML = "<h3>Абзацы на странице:</h3>";

  // Восстанавливаем элементы из оригинала
  originalElements.forEach((item) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = item.html;
    const element = tempDiv.firstChild;
    elementsContainer.appendChild(element);
  });

  // Очищаем историю удалений
  removedElements = [];
  updateRemovedHistory();

  // Обновляем счётчик
  updateCounter();

  showNotification("Все элементы восстановлены!");
}

// Функция для обновления истории удалений
function updateRemovedHistory() {
  if (removedElements.length === 0) {
    removedHistory.style.display = "none";
    return;
  }

  removedHistory.style.display = "block";
  removedList.innerHTML = "";

  // Показываем последние 5 удалённых элементов
  const recentRemoved = removedElements.slice(0, 5);
  recentRemoved.forEach((item) => {
    const div = document.createElement("div");
    div.className = "removed-item";
    div.innerHTML = `
                    <strong>${item.timestamp}</strong>: 
                    ${item.textContent.substring(0, 40)}${
      item.textContent.length > 40 ? "..." : ""
    }
                `;
    removedList.appendChild(div);
  });
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
removeBtn.addEventListener("click", removeFirstDescription);
removeAllBtn.addEventListener("click", removeAllDescriptions);
resetBtn.addEventListener("click", resetAllElements);

// Инициализация
saveOriginalState();
updateCounter();
highlightNextElement();

// Инструкция при загрузке
setTimeout(() => {
  showNotification('Нажмите кнопку "Удалить первый элемент" чтобы начать!');
}, 1000);
