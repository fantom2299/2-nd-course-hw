// Задание 1  //

const people = [
  { name: "Глеб", age: 29 },
  { name: "Анна", age: 17 },
  { name: "Олег", age: 7 },
  { name: "Оксана", age: 47 },
];

// Сортируем по возрастанию возраста
console.log(people.sort((a, b) => a.age - b.age));

// Задание 2  //

// Функция-правило: проверяет, положительное ли число
function isPositive(value) {
  return value > 0;
}

// Функция-правило: проверяет, является ли пол male
function isMale(person) {
  return person.gender === "male";
}

// Реализация функции filter (аналог Array.prototype.filter)
function filter(array, ruleFunction) {
  const result = []; // Массив для отфильтрованных элементов

  // Проходим по всем элементам исходного массива
  for (let i = 0; i < array.length; i++) {
    if (ruleFunction(array[i], i, array)) {
      result.push(array[i]);
    }
  }

  return result;
}

// Тестирование с числами
console.log(filter([3, -4, 1, 9], isPositive));

const people = [
  { name: "Глеб", gender: "male" },
  { name: "Анна", gender: "female" },
  { name: "Олег", gender: "male" },
  { name: "Оксана", gender: "female" },
];

// Тестирование с объектами
console.log(filter(people, isMale));

// Задание 3  //

let secondsPassed = 0;
const totalSeconds = 30;
const intervalSeconds = 3;

// Создаём интервал, который срабатывает каждые 3 секунды
const intervalId = setInterval(() => {
  // Выводим текущую дату и время
  console.log(new Date().toLocaleString());

  // Увеличиваем счётчик
  secondsPassed += intervalSeconds;

  // Если прошло 30 секунд - останавливаем интервал
  if (secondsPassed >= totalSeconds) {
    clearInterval(intervalId);
    console.log("30 секунд прошло");
  }
}, intervalSeconds * 1000); // Переводим секунды в миллисекунды

// Задание 4  //

function delayForSecond(callback) {
  // Используем setTimeout для задержки выполнения callback на 1 секунду
  setTimeout(callback, 1000);
}

delayForSecond(function () {
  console.log("Привет, Глеб!");
});


// Задание 5  //


function delayForSecond(cb) {
    setTimeout(() => {
        console.log('Прошла одна секунда');
        if(cb) {  cb(); }
    }, 1000)
}

// Функция sayHi выводит в консоль приветствие для указанного имени
function sayHi (name) {
    console.log(`Привет, ${name}!`);
}


delayForSecond(() => sayHi('Глеб'));