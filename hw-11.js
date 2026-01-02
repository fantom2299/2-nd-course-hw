// Сохраняем исходные тексты
    const originalTexts = [];

    function changeDescriptions() {
      // 1. Находим ВСЕ элементы с классом description
      const descriptionElements = document.querySelectorAll('.description');

      // 2. Перебираем найденные элементы
      descriptionElements.forEach((element, index) => {
        // Сохраняем исходный текст при первом изменении
        if (originalTexts.length <= index) {
          originalTexts[index] = element.textContent;
        }

        // 3. Изменяем текстовое содержимое
        element.textContent = 'Текст изменили!!';

        // 4. Меняем стили для наглядности
        element.classList.remove('original');
        element.classList.add('changed');
      });

      // 5. Показываем сообщение
      alert(`Изменено ${descriptionElements.length} элементов с классом "description"`);
    }

    function resetText() {
      const descriptionElements = document.querySelectorAll('.description');

      descriptionElements.forEach((element, index) => {
        if (originalTexts[index]) {
          element.textContent = originalTexts[index];
        }
        element.classList.remove('changed');
        element.classList.add('original');
      });

      alert('Текст восстановлен');
    }