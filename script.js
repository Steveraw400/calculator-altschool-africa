const display = document.getElementById("display");


function appendtoDisplay(input){
 display.value += input;
}

  function clearDisplay() {
  display.value = "";
}

function calculatepercentage() {
  display.value= eval (display.value / 100);
}

function calculatePower() {
    // Replace '^' with '**' for exponentiation before evaluating
    let expression = display.value.replace (/\^/g, '**');
    display.value = eval(expression);
}


function calculateResult() {
  try {
    display.value = eval(display.value)
  }
  catch (error) {
    display.value = "Error";
  }

   {
  try {
    // Replace 'x' with '*' and '÷' with '/' for JavaScript evaluation
    let expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');
  }
  catch (error) {
    display.value = "Error";
  }
}
// Function to calculate the result of the expression in the display
try {
    // Replace 'x' with '*' and '÷' with '/' for JavaScript evaluation
    let expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');
    // Replace '%' with '/100' for percentage calculation
    expression = expression.replace(/%/g, '/100');
    // Replace '^' with '**' for exponentiation
    expression = expression.replace(/\^/g, '**');
    const result = eval(expression);
    addToHistory(display.value, result); // Add to history
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }

}

function backspace() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}


// Function to add a calculation to the history section
function addToHistory(expression, result) {
//history list  was created
  let historyList = document.getElementById('history-list');
  if (!historyList) {
    const historyDiv = document.createElement('div');
    historyDiv.id = 'history';
    historyDiv.innerHTML = '<h2>History</h2><ul id="history-list"></ul>';
    document.body.appendChild(historyDiv);
    historyList = document.getElementById('history-list');
  }
  // Create a new list item and add it to the top
  const li = document.createElement('li');
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);
}

// Listen for keyboard events on the whole document
document.addEventListener('keydown', function(event) {
  const key = event.key;

  // If the key is a number (0-9), add it to the display
  if (!isNaN(key)) {
    appendtoDisplay(key);

  // If the key is +, -, or ., add it to the display
  } else if (key === '+' || key === '-' || key === '.') {
    appendtoDisplay(key);

  // If the key is *, x, or X, treat as multiplication
  } else if (key === '*' || key === 'x' || key === 'X') {
    appendtoDisplay('x');

  // If the key is / or ÷, treat as division
  } else if (key === '/' || key === '÷') {
    appendtoDisplay('÷');

  // If the key is %, add it to the display
  } else if (key === '%') {
    appendtoDisplay('%');

  // If the key is ^, add it to the display
  } else if (key === '^') {
    appendtoDisplay('^');

  // If Enter or = is pressed, calculate the result
  } else if (key === 'Enter' || key === '=') {
    calculateResult();

  // If Backspace is pressed, remove the last character
  } else if (key === 'Backspace') {
    backspace();

  // If C or c is pressed, clear the display
  } else if (key === 'c' || key === 'C') {
    clearDisplay();
  }
});