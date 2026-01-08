let display = document.getElementById("display-box");

let del = document.getElementById("delete-btn");
let clear = document.getElementById("clear-btn");

let percent = document.getElementById("percentage-btn");
let divide = document.getElementById("divide-btn");
let seven = document.getElementById("num-seven");
let eight = document.getElementById("num-eight");
let nine = document.getElementById("num-nine");
let multiply = document.getElementById("multiply-btn");
let four = document.getElementById("num-four");
let five = document.getElementById("num-five");
let six = document.getElementById("num-six");
let minus = document.getElementById("minus-btn");
let one = document.getElementById("num-one");
let two = document.getElementById("num-two");
let three = document.getElementById("num-three");
let plus = document.getElementById("plus-btn");
let decimal = document.getElementById("decimal-btn");
let zero = document.getElementById("zero-btn");
let doubleZero = document.getElementById("double-zero");
let equalto = document.getElementById("equalto-btn");

let storage = ""; 

//number buttons

function append(value) {
  storage += value;
  display.innerText = storage;
}

one.onclick = () => append("1");
two.onclick = () => append("2");
three.onclick = () => append("3");
four.onclick = () => append("4");
five.onclick = () => append("5");
six.onclick = () => append("6");
seven.onclick = () => append("7");
eight.onclick = () => append("8");
nine.onclick = () => append("9");
zero.onclick = () => append("0");
doubleZero.onclick = () => append("00");

//operator buttons

plus.onclick = () => append("+");
minus.onclick = () => append("-");
multiply.onclick = () => append("*");
divide.onclick = () => append("/");
percent.onclick = () => append("%");
decimal.onclick = () => append(".");

//delete and clear button

del.onclick = () => {
  storage = storage.slice(0, -1);
  display.innerText = storage;
};

clear.onclick = () => {
  storage = "";
  display.innerText = "";
};

//calculation logic

function calculateExpression(expr) {
  let numbers = expr.split(/[\+\-\*\/%]/).map(Number);
  let operators = expr.replace(/[0-9\.]/g, "").split("");

  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    let next = numbers[i + 1];

    if (operators[i] === "+") result += next;
    else if (operators[i] === "-") result -= next;
    else if (operators[i] === "*") result *= next;
    else if (operators[i] === "/") result /= next;
    else if (operators[i] === "%") result %= next;
  }

  return result;
}

//equal button

equalto.onclick = () => {
  try {
    storage = calculateExpression(storage).toString();
    display.innerText = storage;
  } catch {
    display.innerText = "Invalid Expression";
    storage = "";
  }
};

//keyboard support

document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    append(key);
  }

  else if (key === "Enter") {
    equalto.click();
  }

  else if (key === "Backspace") {
    del.click();
  }

  else if (key === "Escape") {
    clear.click();
  }
});


