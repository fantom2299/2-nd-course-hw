// Сохраняем исходные тексты элементов с классом description
let originalTexts = [];

// Функция для изменения текста в элементах с классом description
function changeDescriptionText() {
  // 1. Используем querySelectorAll для поиска всех элементов p с классом description
  const descriptionParagraphs = document.querySelectorAll("p.description");

  // 2. Сохраняем исходные тексты при первом запуске
  if (originalTexts.length === 0) {
    descriptionParagraphs.forEach((paragraph, index) => {
      originalTexts[index] = paragraph.textContent;
    });
  }

  // 3. Перебираем найденные элементы и изменяем их текст
  descriptionParagraphs.forEach((paragraph, index) => {
    paragraph.textContent = "Изменили текст!!";
    paragraph.classList.add("changed");
  });

  // 4. Выводим информацию о результате
  const output = document.getElementById("output");
  output.innerHTML = `
                <strong>Результат:</strong> Изменено ${descriptionParagraphs.length} элементов с классом "description".<br>
                <small>Элементы выделены оранжевым цветом.</small>
            `;
}

// Функция для возврата исходного текста
function resetText() {
  const descriptionParagraphs = document.querySelectorAll("p.description");

  descriptionParagraphs.forEach((paragraph, index) => {
    if (originalTexts[index]) {
      paragraph.textContent = originalTexts[index];
    }
    paragraph.classList.remove("changed");
  });

  const output = document.getElementById("output");
  output.innerHTML =
    "<strong>Результат:</strong> Текст восстановлен к исходному состоянию.";
}

// Функция для подсчета элементов
function countElements() {
  // Разные варианты использования querySelectorAll:
  const allParagraphs = document.querySelectorAll("p");
  const descriptionElements = document.querySelectorAll(".description");
  const descriptionParagraphs = document.querySelectorAll("p.description");
  const multiClassElements = document.querySelectorAll("p.description.info");

  const output = document.getElementById("output");
  output.innerHTML = `
                <strong>Статистика элементов:</strong><br>
                • Всего абзацев &lt;p&gt;: ${allParagraphs.length}<br>
                • Всего элементов с классом "description": ${descriptionElements.length}<br>
                • Абзацев с классом "description": ${descriptionParagraphs.length}<br>
                • Элементов с классами "description" и "info": ${multiClassElements.length}
            `;
}

// Назначаем обработчики событий на кнопки
document
  .getElementById("changeBtn")
  .addEventListener("click", changeDescriptionText);
document.getElementById("resetBtn").addEventListener("click", resetText);


// Автоматически считаем элементы при загрузке
window.addEventListener("DOMContentLoaded", countElements);
