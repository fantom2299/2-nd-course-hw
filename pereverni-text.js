// DOM элементы
const textInput = document.getElementById('text-input');
const reverseBtn = document.getElementById('reverse-btn');
const clearBtn = document.getElementById('clear-btn');
const exampleBtn = document.getElementById('example-btn');
const copyBtn = document.getElementById('copy-btn');
const clearHistoryBtn = document.getElementById('clear-history');
const checkPalindromeBtn = document.getElementById('check-palindrome');
const palindromeInput = document.getElementById('palindrome-input');

const resultText = document.getElementById('result-text');
const charCount = document.getElementById('char-count');
const originalLength = document.getElementById('original-length');
const reversedLength = document.getElementById('reversed-length');
const processTime = document.getElementById('process-time');
const historyList = document.getElementById('history-list');
const palindromeResult = document.getElementById('palindrome-result');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Массив для хранения истории
let history = JSON.parse(localStorage.getItem('reverseHistory')) || [];

// Инициализация
function init() {
    updateCharCounter();
    loadHistory();
    textInput.focus();
}

// Функция для переворачивания текста
function reverseText(text) {
    const startTime = performance.now();
    
    // Разбиваем строку на массив символов, переворачиваем и объединяем
    const reversed = text.split('').reverse().join('');
    
    const endTime = performance.now();
    processTime.textContent = (endTime - startTime).toFixed(2);
    
    return reversed;
}

// Функция для проверки на палиндром
function isPalindrome(text) {
    // Убираем пробелы и приводим к нижнему регистру
    const cleanText = text.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
    
    if (cleanText.length < 2) return false;
    
    // Переворачиваем текст
    const reversed = cleanText.split('').reverse().join('');
    
    return cleanText === reversed;
}

// Обновление счетчика символов
function updateCharCounter() {
    const length = textInput.value.length;
    charCount.textContent = length;
    
    if (length > 500) {
        charCount.style.color = '#ff4757';
        textInput.style.borderColor = '#ff4757';
    } else {
        charCount.style.color = '#666';
        textInput.style.borderColor = '#e0e0e0';
    }
}

// Показать уведомление
function showNotification(message, isSuccess = true) {
    notificationText.textContent = message;
    notification.style.background = isSuccess ? '#4CAF50' : '#ff4757';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Сохранить в историю
function saveToHistory(original, reversed) {
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = {
        id: Date.now(),
        original: original,
        reversed: reversed,
        timestamp: timestamp
    };
    
    history.unshift(historyItem);
    
    // Ограничиваем историю 10 последними записями
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('reverseHistory', JSON.stringify(history));
    loadHistory();
}

// Загрузить историю
function loadHistory() {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">История пуста. Начните переворачивать текст!</div>';
        return;
    }
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <div class="history-text">${item.original.substring(0, 30)}${item.original.length > 30 ? '...' : ''}</div>
                <div class="history-reversed">→ ${item.reversed.substring(0, 30)}${item.reversed.length > 30 ? '...' : ''}</div>
            </div>
            <div style="font-size: 0.8rem; color: #999;">${item.timestamp}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Очистить историю
function clearHistory() {
    if (history.length === 0) {
        showNotification('История уже пуста!', false);
        return;
    }
    
    if (confirm('Вы уверены, что хотите очистить историю?')) {
        history = [];
        localStorage.removeItem('reverseHistory');
        loadHistory();
        showNotification('История очищена!');
    }
}

// События
textInput.addEventListener('input', updateCharCounter);

reverseBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    
    if (!text) {
        showNotification('Введите текст для переворота!', false);
        return;
    }
    
    if (text.length > 500) {
        showNotification('Текст слишком длинный! Максимум 500 символов.', false);
        return;
    }
    
    const reversed = reverseText(text);
    resultText.textContent = reversed;
    originalLength.textContent = text.length;
    reversedLength.textContent = reversed.length;
    
    saveToHistory(text, reversed);
    showNotification('Текст успешно перевернут!');
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    resultText.textContent = 'Здесь появится перевернутый текст...';
    originalLength.textContent = '0';
    reversedLength.textContent = '0';
    processTime.textContent = '0';
    updateCharCounter();
    showNotification('Поле очищено!');
});

exampleBtn.addEventListener('click', () => {
    const examples = [
        "Привет, мир!",
        "JavaScript - это весело!",
        "А роза упала на лапу Азора",
        "1234567890",
        "🌍🚀👨‍🚀 Hello World!"
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    textInput.value = randomExample;
    updateCharCounter();
    showNotification('Пример загружен!');
});

copyBtn.addEventListener('click', () => {
    const textToCopy = resultText.textContent;
    
    if (textToCopy === 'Здесь появится перевернутый текст...') {
        showNotification('Нет текста для копирования!', false);
        return;
    }
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showNotification('Текст скопирован в буфер обмена!');
        })
        .catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Не удалось скопировать текст', false);
        });
});

clearHistoryBtn.addEventListener('click', clearHistory);

checkPalindromeBtn.addEventListener('click', () => {
    const text = palindromeInput.value.trim();
    
    if (!text) {
        palindromeResult.textContent = 'Введите текст для проверки!';
        palindromeResult.style.background = '#ff9800';
        return;
    }
    
    if (isPalindrome(text)) {
        palindromeResult.textContent = '✅ Это палиндром!';
        palindromeResult.style.background = '#4CAF50';
        palindromeResult.style.color = 'white';
    } else {
        palindromeResult.textContent = '❌ Это не палиндром';
        palindromeResult.style.background = '#ff4757';
        palindromeResult.style.color = 'white';
    }
});

// Быстрое переворачивание по Ctrl+Enter
textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        reverseBtn.click();
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);