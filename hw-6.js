// Задание 1  //

const str = 'js';
const upperStr = str.toUpperCase();
console.log(upperStr); 

// Задание 2  //

function filterByPrefix(arr, prefix) {
  const lowerPrefix = prefix.toLowerCase();
  
  return arr.filter(str => 
    str.toLowerCase().startsWith(lowerPrefix)
  );
}

// Задание 3  //

const number = 32.58884;

const floorResult = Math.floor(number);
console.log('До меньшего целого:', floorResult); // 32


const ceilResult = Math.ceil(number);
console.log('До большего целого:', ceilResult); // 33


const roundResult = Math.round(number);
console.log('До ближайшего целого:', roundResult); // 33

// Задание 4  //

const numbers = [ 52, 53, 49, 77, 21, 32 ];


const min = Math.min(...numbers);

 
const max = Math.max(...numbers);

console.log('Минимальное значение:', min); 
console.log('Максимальное значение:', max); 

// Задание 5  //

function randomNumber() {
  const random = Math.floor(Math.random() * 10) + 1;
  console.log(random);
  return random;
}

randomNumber(); 

// Задание 6  //

function generateRandomArray(num) {
  
  if (!Number.isInteger(num) || num <= 0) {
    console.error('Аргумент должен быть положительным целым числом');
    return [];
  }
  
  
  const length = Math.floor(num / 2);
  
  
  const result = Array.from({length}, () => Math.floor(Math.random() * (num + 1)));
  
  return result;
}

console.log(generateRandomArray(10)); 
console.log(generateRandomArray(7));  


// Задание 7  //

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


console.log(getRandomInRange(1, 10));   
console.log(getRandomInRange(5, 15));   
console.log(getRandomInRange(-5, 5));   

// Задание 8  //

const currentDate = new Date();
console.log(currentDate);

// Задание 9  //


const currentDate2 = new Date();

const futureDate = new Date(currentDate);

futureDate.setDate(currentDate.getDate() + 73);

console.log('Текущая дата:', currentDate.toLocaleDateString());
console.log('Дата через 73 дня:', futureDate.toLocaleDateString());

// Задание 10  //

function formatDateTime(date) {
  
  if (!(date instanceof Date) || isNaN(date)) {
    return 'Ошибка: передан некорректный объект Date';
  }

 
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const weekdays = [
    'воскресенье', 'понедельник', 'вторник', 'среда',
    'четверг', 'пятница', 'суббота'
  ];
  
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const weekday = weekdays[date.getDay()];
  

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  

  return `Дата: ${day} ${month} ${year} года — это ${weekday}.\nВремя: ${hours}:${minutes}:${seconds}`;
}


const now = new Date();
console.log(formatDateTime(now));