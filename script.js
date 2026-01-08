let display = document.getElementById("display-box");

let del = document.getElementById("delete-btn");
let clear = document.getElementById("clear-btn");

let percent = document.getElementById("percentage-btn");
let divide = document.getElementById("divide-btn");
let multiply = document.getElementById("multiply-btn");
let minus = document.getElementById("minus-btn");
let plus = document.getElementById("plus-btn");

let one = document.getElementById("num-one");
let two = document.getElementById("num-two");
let three = document.getElementById("num-three");
let four = document.getElementById("num-four");
let five = document.getElementById("num-five");
let six = document.getElementById("num-six");
let seven = document.getElementById("num-seven");
let eight = document.getElementById("num-eight");
let nine = document.getElementById("num-nine");
let zero = document.getElementById("zero-btn");
let doubleZero = document.getElementById("double-zero");
let decimal = document.getElementById("decimal-btn");

let equalto = document.getElementById("equalto-btn");

let storage = "";

// -------------------- INPUT HANDLING --------------------

function append(value) {
  const lastChar = storage.slice(-1);
  const operators = ["+", "-", "*", "/", "%", "."];

  // prevent duplicate operators
  if (operators.includes(lastChar) && operators.includes(value)) return;

  storage += value;
  display.innerText = storage;
}

// number buttons
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

// operator buttons
plus.onclick = () => append("+");
minus.onclick = () => append("-");
multiply.onclick = () => append("*");
divide.onclick = () => append("/");
percent.onclick = () => append("%");
decimal.onclick = () => append(".");

// delete & clear
del.onclick = () => {
  storage = storage.slice(0, -1);
  display.innerText = storage;
};

clear.onclick = () => {
  storage = "";
  display.innerText = "";
};

// -------------------- CALCULATION LOGIC --------------------

// handle *, /, % first
function computeHighPriority(numbers, operators) {
  for (let i = 0; i < operators.length; i++) {
    if (["*", "/", "%"].includes(operators[i])) {
      let a = numbers[i];
      let b = numbers[i + 1];

      if (operators[i] === "/" && b === 0) {
        throw new Error("Divide by zero");
      }

      let result =
        operators[i] === "*" ? a * b :
        operators[i] === "/" ? a / b :
        a * (b / 100); // percentage logic

      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }
}

// handle + and -
function computeLowPriority(numbers, operators) {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    let next = numbers[i + 1];
    if (operators[i] === "+") result += next;
    else result -= next;
  }

  return result;
}

function calculateExpression(expr) {
  let numbers = expr.split(/[\+\-\*\/%]/).map(Number);
  let operators = expr.replace(/[0-9\.]/g, "").split("");

  computeHighPriority(numbers, operators);
  return computeLowPriority(numbers, operators);
}

// -------------------- EQUAL BUTTON --------------------

equalto.onclick = () => {
  try {
    storage = calculateExpression(storage).toString();
    display.innerText = storage;
  } catch {
    display.innerText = "Invalid Expression";
    storage = "";
  }
};

// -------------------- KEYBOARD SUPPORT --------------------

document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    append(key);
  } else if (key === "Enter") {
    equalto.click();
  } else if (key === "Backspace") {
    del.click();
  } else if (key === "Escape") {
    clear.click();
  }
});
