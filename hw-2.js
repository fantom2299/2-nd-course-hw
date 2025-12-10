// Задание 1


let password = 'пароль';


let userInput = prompt('Введите пароль');


if (userInput === password) {
    console.log('Пароль введен верно');
} else {
    console.log('Пароль введен неправильно');
}


// Задание 2


let c = 2; 


if (c > 0 && c < 10) {
    console.log('Верно');
} else {
    console.log('Неверно');
}

//Проверка разных значений:

1. let c = 0; // ответ: Неверно.
2. let c = 10: // ответ: Неверно.
3. let c = -3: // ответ: Неверно.
4. let c = 2; // ответ: Верно.


// Задание 3


let d = 120;
let e = 50;


if (d > 100 || e > 100) {
    console.log('Верно');
} else {
    console.log('Неверно');
}


// Задание 4


let a = '2';
let b = '3';


alert(Number(a) + Number(b));


alert(+a + +b);


// Задание 5


let monthNumber = 12;

if (monthNumber > 12 || monthNumber < 1) {
  console.log("Ошибка: номер месяца должен быть от 1 до 12");
} else {
  switch (monthNumber) {
    case 12:
    case 1:
    case 2:
      console.log("Зима");
      break;

    case 3:
    case 4:
    case 5:
      console.log("Весна");
      break;

    case 6:
    case 7:
    case 8:
      console.log("Лето");
      break;

    case 9:
    case 10:
    case 11:
      console.log("Осень");
      break;
  }
}
