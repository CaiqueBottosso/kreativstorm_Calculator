let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;

const display = document.getElementById("display");
const modeToggleBtn = document.getElementById("modeToggle");
const operatorButton = document.querySelectorAll(".operator");
const body = document.body;

// display update
function updateDisplay() {
  if (displayValue.length > 10) {
    displayValue = displayValue.slice(0, 10);
  }
  display.textContent = displayValue;
}

// listener for button clicks
document.querySelectorAll(".calculator button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isNaN(button.textContent)) {
      handleNumber(button.textContent);
    } else if (button.textContent === ".") {
      handleDecimal();
    } else if (button.textContent === "C") {
      clearCalculator();
    } else if (button.textContent === "←") {
      backspace();
    } else if (button.textContent === "=") {
      handleEquals();
    } else {
      handleOperator(button.textContent);
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (key === "Backspace") {
    event.preventDefault(); // Prevent default backspace behavior
    backspace();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault(); // Prevent form submission
    handleEquals();
  } else if (key === "Escape" || key === "c") {
    clearCalculator();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperator(key);
  }
});

function handleNumber(number) {
  if (waitingForSecondNumber) {
    displayValue = number;
    waitingForSecondNumber = false;
  } else {
    displayValue = displayValue === "0" ? number : displayValue + number;
  }
  updateDisplay();
}

function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function handleOperator(operator) {
  currentOperator = operator;
  if (!waitingForSecondNumber) {
    if (firstNumber === null) {
      firstNumber = parseFloat(displayValue);
    } else if (currentOperator) {
      secondNumber = parseFloat(displayValue);
      const result = operate(currentOperator, firstNumber, secondNumber);
      displayValue = formatResult(result);
      firstNumber = result;
    }
    waitingForSecondNumber = true;
  }
  updateDisplay();
}

function handleEquals() {
  if (firstNumber === null || currentOperator === null) {
    return;
  }
  secondNumber = parseFloat(displayValue);
  const result = operate(currentOperator, firstNumber, secondNumber);
  displayValue = formatResult(result);
  firstNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

function formatResult(result) {
  // Check if result is a number
  if (typeof result === "number") {
    // Limit the result to 12 significant digits and remove unnecessary trailing zeros
    if (Number.isInteger(result)) {
      return result.toString();
    } else {
      return parseFloat(result.toPrecision(12)).toString();
    }
  } else {
    return result;
  }
}

function clearCalculator() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

function backspace() {
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "no % by 0!";
  }
  return a / b;
}

// light mode
modeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    modeToggleBtn.textContent = "🌙";
  } else {
    modeToggleBtn.textContent = "☀️";
  }
});
