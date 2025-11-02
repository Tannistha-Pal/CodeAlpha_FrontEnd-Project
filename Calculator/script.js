// Calculator state variables
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetScreen = false;

// DOM Elements
const currentOperandElement = document.querySelector('.current-operand');
const previousOperandElement = document.querySelector('.previous-operand');
const buttons = document.querySelectorAll('button');

// Update the display
function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  previousOperandElement.textContent = previousOperand;
}

// Append number to current operand
function appendNumber(number) {
  if (currentOperand === '0' || resetScreen) {
    currentOperand = number;
    resetScreen = false;
  } else {
    currentOperand += number;
  }
}

// Add decimal point
function addDecimal() {
  if (resetScreen) {
    currentOperand = '0.';
    resetScreen = false;
    return;
  }

  if (!currentOperand.includes('.')) {
    currentOperand += '.';
  }
}

// Handle operations
function chooseOperation(op) {
  if (currentOperand === '') return;

  if (previousOperand !== '') {
    calculate();
  }

  operation = op;
  previousOperand = `${currentOperand} ${op}`;
  currentOperand = '';
}

// Perform calculation
function calculate() {
  if (previousOperand === '' || currentOperand === '' || operation === null) return;

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let computation;

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clear();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = '';
  resetScreen = true;
}

// Clear the calculator
function clear() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
}

// Delete the last digit
function deleteDigit() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.hasAttribute('data-number')) {
      appendNumber(button.getAttribute('data-number'));
      updateDisplay();
    }

    if (button.hasAttribute('data-operation')) {
      chooseOperation(button.getAttribute('data-operation'));
      updateDisplay();
    }

    if (button.dataset.action === 'calculate') {
      calculate();
      updateDisplay();
    }

    if (button.dataset.action === 'clear') {
      clear();
      updateDisplay();
    }

    if (button.dataset.action === 'delete') {
      deleteDigit();
      updateDisplay();
    }
  });
});

// Keyboard support
document.addEventListener('keydown', event => {
  if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
    if (event.key === '.') addDecimal();
    else appendNumber(event.key);
    updateDisplay();
  }

  if (['+', '-', '*', '/'].includes(event.key)) {
    let op;
    switch (event.key) {
      case '+': op = '+'; break;
      case '-': op = '-'; break;
      case '*': op = '×'; break;
      case '/': op = '÷'; break;
    }
    chooseOperation(op);
    updateDisplay();
  }

  if (event.key === 'Enter') {
    calculate();
    updateDisplay();
  }

  if (event.key === 'Escape') {
    clear();
    updateDisplay();
  }

  if (event.key === 'Backspace') {
    deleteDigit();
    updateDisplay();
  }
});

// Initialize display
updateDisplay();
