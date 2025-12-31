// Задание 1 //

console.log("Привет");
console.log("Привет");

// Задание 2 //

// Вариант 1: цикл for
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Вариант 2: цикл while
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}

// Вариант 3: for...of с массивом
for (let num of [1, 2, 3, 4, 5]) {
    console.log(num);
}

// Вариант 4: метод forEach
[1, 2, 3, 4, 5].forEach(num => console.log(num));

// Вариант 5: с помощью Array.from
Array.from({length: 5}, (_, i) => i + 1).forEach(num => console.log(num));

// Задание 3 //

// Вариант 1: цикл for (самый простой)
for (let i = 7; i <= 22; i++) {
    console.log(i);
}

// Вариант 2: цикл while
let i = 7;
while (i <= 22) {
    console.log(i);
    i++;
}

// Вариант 3: создание массива и итерация
for (let num = 7; num <= 22; num++) {
    console.log(num);
}

// Вариант 4: с использованием Array.from
Array.from({length: 22 - 7 + 1}, (_, i) => i + 7).forEach(num => console.log(num));

// Вариант 5: генерация последовательности
[...Array(22 - 7 + 1).keys()].map(i => i + 7).forEach(num => console.log(num));


// Оптимальное решение

for (let i = 7; i <= 22; i++) {
    console.log(i);
}


//  Задание 4  //

const obj = {
    "Коля": '200',
    "Вася": '300',
    "Петя": '400'
};


for (const name in obj) {
    console.log(`${name} — зарплата ${obj[name]} долларов`);
}

//  Задание 5  //


let n = 1000;
const limit = 50;
let num = 0; // счетчик итераций

// Цикл деления на 2, пока n >= 50
while (n >= limit) {
    n = n / 2;  // делим на 2
    num++;      // увеличиваем счетчик итераций
}

// Результат
console.log(`Результат: ${n}`);
console.log(`Количество итераций: ${num}`);

// Для проверки выведем промежуточные значения
console.log("\nПроверка:");
let testN = 1000;
let count = 0;
while (testN >= 50) {
    console.log(`Итерация ${count + 1}: ${testN} / 2 = ${testN / 2}`);
    testN = testN / 2;
    count++;
}

//  Задание 6  //

// Номер первой пятницы месяца (от 1 до 7)
const firstFriday = 6; // например, 6-е число месяца - это пятница

// Всего дней в месяце
const totalDays = 31;

// Выводим сообщения для всех пятниц месяца
for (let day = firstFriday; day <= totalDays; day += 7) {
    console.log(`Сегодня пятница, ${day}-е число. Необходимо подготовить отчет.`);
}