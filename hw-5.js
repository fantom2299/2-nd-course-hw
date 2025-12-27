// Задание 1  //

// Решение с использованием цикла for

const arr = [1, 5, 4, 10, 0, 3];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  if (arr[i] === 10) {
    break; // Прерываем цикл при встрече значения 10
  }
}


// Решение с использованием цикла while 

const arr = [1, 5, 4, 10, 0, 3];
let i = 0;

while (i < arr.length) {
  console.log(arr[i]);
  if (arr[i] === 10) {
    break; // Прерываем цикл при встрече значения 10
  }
  i++;
}

// Задание 2  //

// Используем метод indexOf()

const arr = [1, 5, 4, 10, 0, 3];
const index = arr.indexOf(4);
console.log(index); 

// Используем метод findIndex()

const arr = [1, 5, 4, 10, 0, 3];
const index = arr.findIndex(item => item === 4);
console.log(index); 

// Используем цикл

const arr = [1, 5, 4, 10, 0, 3];
let index = -1; // Инициализируем значением -1 (не найдено)

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 4) {
    index = i;
    break; 
  }
}

console.log(index); 

// Задание 3  //

const arr = [1, 3, 5, 10, 20];

const result1 = arr.join(' ');
console.log(result1); // "1 3 5 10 20"


// Задание 4  //

// Используем цикл for

const size = 3; // Размер массива (3x3)
const arr = [];

for (let i = 0; i < size; i++) {
  const innerArr = []; 
  for (let j = 0; j < size; j++) {
    innerArr.push(1); 
  }
  arr.push(innerArr); 
}

console.log(arr); 


// Используем Array.from() и цикл

const size = 3;
const arr = [];

for (let i = 0; i < size; i++) {
  const innerArr = Array.from({length: size}, () => 1);
  arr.push(innerArr);
}

console.log(arr); 

// Задание 5  //

// Используем метод push()

const arr = [1, 1, 1];

arr.push(2);
arr.push(2);
arr.push(2);

console.log(arr); 

// Используем метод push() с несколькими аргументами

const arr = [1, 1, 1];

arr.push(2, 2, 2);

console.log(arr); 

// Задание 6  //

const arr = [9, 8, 7, 'a', 6, 5];

arr.sort();

const indexOfA = arr.indexOf('a');
if (indexOfA !== -1) {
  arr.splice(indexOfA, 1);
}

console.log(arr); 


// Задание 7  //

const arr = [9, 8, 7, 6, 5];

const userInput = prompt('Угадайте число от 5 до 9:');

const userNumber = Number(userInput);

if (arr.includes(userNumber)) {
  alert('Угадал!');
} else {
  alert('Не угадал');
}

// Задание 8  //

const str = 'abcdef';
const reversed = str.split('').reverse().join('');
console.log(reversed); 

// Задание 9  //

// Используем метод flat() 

const arr = [[1, 2, 3], [4, 5, 6]];
const result = arr.flat();
console.log(result); 

// Используем concat() с оператором spread

const arr = [[1, 2, 3], [4, 5, 6]];
const result = [].concat(...arr);
console.log(result); 

// Используем цикл 

const arr = [[1, 2, 3], [4, 5, 6]];
const result = [];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    result.push(arr[i][j]);
  }
}

console.log(result);

// Задание 10  //

// 1. Создаем массив с произвольными числами от 1 до 10
const arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 10) + 1); 
}

console.log('Исходный массив:', arr);

// 2. Перебираем массив и выводим сумму текущего и следующего элементов
for (let i = 0; i < arr.length - 1; i++) {
  const sum = arr[i] + arr[i + 1];
  console.log(`arr[${i}] + arr[${i + 1}] = ${arr[i]} + ${arr[i + 1]} = ${sum}`);
}

// Задание 11  //

function squareArray(arr) {
  return arr.map(num => num * num);
}

const numbers = [1, 2, 3, 4, 5];
const squares = squareArray(numbers);
console.log(squares); 

// Задание 12  //

function getWordLengths(arr) {
  return arr.map(word => word.length);
}

const words = ['яблоко', 'апельсин', 'банан', 'киви'];
const lengths = getWordLengths(words);
console.log(lengths); 

// Задание 13  //

function filterNegatives(arr) {
  return arr.filter(num => num < 0);
}

const numbers = [1, -2, 3, -4, 5, -6];
const negatives = filterNegatives(numbers);
console.log(negatives);


// Задание 14  //


const originalArray = Array.from({length: 10}, () => Math.floor(Math.random() * 11));

const evenArray = originalArray.filter(num => num % 2 === 0);

console.log('Исходный массив:', originalArray);
console.log('Массив с четными значениями:', evenArray);

// Задание 15  //


const arr = Array.from({length: 6}, () => Math.floor(Math.random() * 10) + 1);

const sum = arr.reduce((acc, num) => acc + num, 0);
const average = sum / arr.length;

console.log('Массив:', arr);
console.log('Сумма:', sum);
console.log('Среднее:', average);