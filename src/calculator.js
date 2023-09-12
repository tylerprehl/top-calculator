

function add(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1+num2;
    result = Math.round(result*100)/100;
    return result.toString();
}

function subtract(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1-num2;
    result = Math.round(result*100)/100;
    return result.toString();
}

function multiply(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1*num2;
    result = Math.round(result*100)/100;
    return result.toString();
}

function divide(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (num2 === 0) {
        return "divide by 0"
    }
    let result = num1/num2;
    result = Math.round(result*100)/100;
    return result.toString();
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "add":
            return add(num1, num2);

        case "subtract":
            return subtract(num1, num2);

        case "multiply":
            return multiply(num1, num2);

        case "divide":
            if (num2 === "0") {
                const evaluationField = document.querySelector(".evaluation-field");
                evaluationField.text = "0"
                clear();
                return "Ha! Nice try champ. You just got reset"
            }
            let result = divide(num1, num2);
            return result;
    }
}

function lockOperators() {
    const operatorButtonsToLock = document.querySelectorAll("#operator");
    operatorButtonsToLock.forEach(operatorButtonToLock => operatorButtonToLock.removeEventListener("click", enterOperator));
}

function unlockOperators() {
    const operatorButtonsToUnlock = document.querySelectorAll("#operator");
    operatorButtonsToUnlock.forEach(operatorButtonToUnlock => operatorButtonToUnlock.addEventListener("click", enterOperator));
}

function enterDigit() {
    currentNumber = currentNumber + this.textContent;
    console.log(`Entered Digit: ${this.textContent}`);
    const evaluationField = document.querySelector(".evaluation-field");
    evaluationField.textContent = currentNumber;
    unlockOperators();
}

function enterOperator() {
    currentOperator = this.name;
    console.log(`Entered Operator: ${currentOperator}`);

    const evaluationField = document.querySelector(".evaluation-field");

    if (previousOperator !== "" && previousOperator !== "=") {
        // then the previous operator exists and should be calculated
        currentNumber = operate(previousNumber, previousOperator, currentNumber);
        evaluationField.textContent = currentNumber;
        
        previousNumber = currentNumber;
        currentNumber = "";
        previousOperator = currentOperator;
        currentOperator = "";
        lockOperators();
    }
    else {
        previousOperator = currentOperator;
        currentOperator = "";

        previousNumber = currentNumber
        currentNumber = "";
    }
    
}

function enterEquals() {
    console.log(`Entered Equals: =`);

    const evaluationField = document.querySelector(".evaluation-field");

    if (previousOperator === "=") {
        currentNumber = operate(currentNumber, lastOperation, previousNumber);
    }
    else {
        currentNumber = operate(previousNumber, previousOperator, currentNumber);
    }
    
    evaluationField.textContent = currentNumber;
    previousNumber = currentNumber;
    currentNumber = "";

    previousOperator = currentOperator;
    currentOperator = "";
}

function clear() {
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
    previousOperator = "";
    lastEntry = "";
    lastOperation = "";
    const evaluationField = document.querySelector(".evaluation-field");
    evaluationField.textContent = "0";
}

let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let previousOperator = "";
let lastEntry = "";
let lastOperation = ""; // for calculator function of "=" repeat last calculation

/* console.log(operate("1", "+", "3"));
console.log(operate("4.4444", "-", "3"));
console.log(operate("1.12345", "*", "3"));
console.log(operate("3.5", "/", "0")); */

const digitButtons = document.querySelectorAll("button.digit");
digitButtons.forEach(digitButton => digitButton.addEventListener("click", enterDigit));

const operatorButtons = document.querySelectorAll("#operator");
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", enterOperator));

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", enterEquals);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);

/*
Ideas for how to implement calculator (to prevent certain issues):
- need to big re-think the "operate" function
    > the chaining of operations works well now
    > using the equals sign needs work
- go for iPhone's operator locking mechanism (choosing an operator after JUST 
    choosing an operator will result in the old operator being replaced with the 
    new one)
    > keep chosen operator highlighted
- implement maximum digit amount
- implement "start from 0" (previousNumber = 0?)
- how the display gets updated:
    > if you enter a digit, that digit gets displayed at ANY time
    > if you enter an operator, if there is a previous operator (that is NOT 
        and equals sign), sum the previous and current numbers and display result
    > if you enter the equal sign:
        * after =: repeat last operation (if you just did 5+3, redo the +3)
        * after number: perform previous operation
*/