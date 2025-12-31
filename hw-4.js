// Задание 1  //

// Вариант 1: Использование Math.min()
function minNumber1(a, b) {
    return Math.min(a, b);
}

// Вариант 2: Условный оператор if
function minNumber2(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

// Вариант 3: Тернарный оператор
function minNumber3(a, b) {
    return a < b ? a : b;
}

// Вариант 4: Стрелочная функция
const minNumber4 = (a, b) => a < b ? a : b;

// Вариант 5: Без сравнения (математический подход)
function minNumber5(a, b) {
    return (a + b - Math.abs(a - b)) / 2;
}

// Примеры использования:
console.log(minNumber1(8, 4));   
console.log(minNumber1(6, 6));   
console.log(minNumber1(10, 20)); 
console.log(minNumber1(-5, 3));  
console.log(minNumber1(0, 0));   

// Проверка всех вариантов:
const testCases = [
    [8, 4, 4],
    [6, 6, 6],
    [10, 20, 10],
    [-5, 3, -5],
    [0, 0, 0],
    [100, 50, 50],
    [-10, -20, -20]
];

console.log("\nПроверка всех функций:");
testCases.forEach(([a, b, expected]) => {
    const result1 = minNumber1(a, b);
    const result2 = minNumber2(a, b);
    const result3 = minNumber3(a, b);
    const result4 = minNumber4(a, b);
    const result5 = minNumber5(a, b);
    
    console.log(`min(${a}, ${b}) = ${result1} | Ожидалось: ${expected}`);
    console.log(`  Все функции вернули одинаково: ${result1 === result2 && result2 === result3 && result3 === result4 && result4 === result5}`);
});

// Самый простой и читаемый вариант:
function getMin(a, b) {
    return Math.min(a, b);
}

// Или если нельзя использовать Math.min():
function getMinWithoutMath(a, b) {
    return a < b ? a : b;
}

console.log("\nРекомендуемые решения:");
console.log("С Math.min():", getMin(8, 4));       
console.log("Без Math.min():", getMinWithoutMath(6, 6)); 

// Задание 2  //

function checkEvenOdd(number) {
    if (number % 2 === 0) {
        return 'Число четное';
    } else {
        return 'Число нечетное';
    }
}

console.log(checkEvenOdd(4));    // Число четное
console.log(checkEvenOdd(7));    // Число нечетное
console.log(checkEvenOdd(0));    // Число четное
console.log(checkEvenOdd(-2));   // Число четное
console.log(checkEvenOdd(-3));   // Число нечетное


// Задание 3  //

// 1. Функция, которая выводит квадрат в консоль
function printSquare(number) {
    console.log(number * number);
}

// 2. Функция, которая возвращает квадрат
function getSquare(number) {
    return number * number;
}

// Примеры использования:
printSquare(5); 
printSquare(3); 

const square1 = getSquare(4); 
const square2 = getSquare(6); 
console.log(square1 + square2); 






// Задание 4  //

function checkUserAge() {
    const ageInput = prompt("Сколько вам лет?");
    const age = Number(ageInput);
    
    if (age < 0 || isNaN(age)) {
        alert('Вы ввели неправильное значение');
    } else if (age >= 0 && age <= 12) {
        alert('Привет, друг!');
    } else {
        alert('Добро пожаловать!');
    }
}

checkUserAge();


// Задание 5  //


function multiplyIfNumbers(a, b) {
    // Преобразуем параметры в числа
    const numA = Number(a);
    const numB = Number(b);
    
    // Проверяем, являются ли они числами
    if (isNaN(numA) || isNaN(numB)) {
        return 'Одно или оба значения не являются числом';
    }
    
    // Если оба числа - возвращаем произведение
    return numA * numB;
}

// Примеры использования:
console.log(multiplyIfNumbers(3, 4));       
console.log(multiplyIfNumbers("3", "4"));  
console.log(multiplyIfNumbers("abc", 4));    
console.log(multiplyIfNumbers(5, "xyz"));    


// Задание 6  //

function cubeNumber() {
    // Запрашиваем у пользователя число
    const userInput = prompt("Введите число:");
    
    // Проверяем, является ли введенное значение числом
    const number = Number(userInput);
    
    if (isNaN(number) || userInput === null || userInput.trim() === '') {
        return 'Переданный параметр не является числом';
    }
    
    // Вычисляем куб числа
    const cube = Math.pow(number, 3); // или number * number * number
    
    // Возвращаем результат
    return `${number} в кубе равняется ${cube}`;
}

cubeNumber();

// Задание 7  //

// Создаем объект circle1
const circle1 = {
    radius: 5,
    
    getArea: function() {
        // Площадь круга: π * r²
        return Math.PI * Math.pow(this.radius, 2);
    },
    
    getPerimeter: function() {
        // Периметр окружности: 2 * π * r
        return 2 * Math.PI * this.radius;
    }
};

// Создаем объект circle2
const circle2 = {
    radius: 10,
    
    getArea: function() {
        return Math.PI * this.radius * this.radius;
    },
    
    getPerimeter: function() {
        return 2 * Math.PI * this.radius;
    }
};

// Проверка работы объектов
console.log("circle1:");
console.log("Радиус:", circle1.radius);
console.log("Площадь:", circle1.getArea());
console.log("Периметр:", circle1.getPerimeter());

console.log("\ncircle2:");
console.log("Радиус:", circle2.radius);
console.log("Площадь:", circle2.getArea());
console.log("Периметр:", circle2.getPerimeter());

// Пример использования методов
const area1 = circle1.getArea();
const perimeter2 = circle2.getPerimeter();

console.log("\nПримеры использования:");
console.log(`Площадь circle1: ${area1}`);
console.log(`Периметр circle2: ${perimeter2}`);

