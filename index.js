const multiply = function(a,b) {
    return (a*b);
} 

const add = function(a,b) {
    return (a+b);
}

const subtract = function(a,b) {
    return(a-b);
}

const divide = function(a,b) {
    return (a/b);
}

let firstNumber = 0;
let secondNumber = 0;
let lastOperator = '';
let lastPressedButton = "";

const operate = function(firstNumber, operator, secondNumber) {
    switch(operator) {
        case 'plus':
            return (add(firstNumber, secondNumber));
        case 'minus':
            return (subtract(firstNumber, secondNumber));
        case 'times':
            return (multiply(firstNumber, secondNumber));
        case 'divide':
            return (divide(firstNumber, secondNumber));
        default:
            return "Unknown operator";

    }
}

let updateDisplay = function(number, newLastPressedButton, operator = false) {
    display = document.querySelector('.display')

    if (operator == true) {
        display.textContent = number;
    } else if (number == "AC") {
        display.textContent = "";
        firstNumber = 0;
        secondNumber = 0;
        lastOperator = '';
        lastPressedButton = "";
    } else if (number == "DEL") {
        display.textContent = display.textContent.slice(0,-1);
    } else if (lastPressedButton == "number" || lastPressedButton == "" || lastPressedButton == "AC") {
        display.textContent += number.toString();
    } else if (lastPressedButton == "operator") {
        display.textContent = number;
    }

    lastPressedButton = newLastPressedButton;
}

for (let i = 0; i<10; i++) {
    let button = document.querySelector(`#btn${i.toString()}`);
    button.addEventListener('click', (function() { 
        updateDisplay(i, "number");
    }));
}

document.querySelector('#btnAC').addEventListener('click', (function() {
    updateDisplay("AC", "AC");
}))

document.querySelector('#btnDEL').addEventListener('click', (function() {
    updateDisplay("DEL","number");
}))


//use an IIFE to avoid the problem of the event listeners only using the last element of the array (divide)
for (operation of ['plus','minus','times','divide']) {
    let operatorButton = document.querySelector(`#btn${operation}`);
    operatorButton.addEventListener('click', (function(operation) {
        return function() {
            if (lastOperator == "" || lastOperator == "equals") {
            firstNumber = parseFloat(document.querySelector('.display').textContent);
            lastOperator = operation;
            lastPressedButton = 'operator';
        } else {
            display = document.querySelector('.display');
            secondNumber = parseFloat(display.textContent);
            result = operate(parseFloat(firstNumber), lastOperator, secondNumber);
            console.log(result);
            updateDisplay(result,"operator", true);
            lastOperator = operation;
            firstNumber = result;
        }
        
    }})(operation))
}

equalsButton = document.querySelector('#btnequals')
equalsButton.addEventListener('click', function() {
    if (lastPressedButton == "number") {
        display = document.querySelector('.display');
        secondNumber = parseFloat(display.textContent);
        result = operate(parseFloat(firstNumber), lastOperator, parseFloat(secondNumber));
        updateDisplay(result, "operator", true);
        lastOperator = "equals";
        firstNumber = result;
    }
})