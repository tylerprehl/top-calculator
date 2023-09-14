

function add(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1+num2;
    // result = Math.round(result*100)/100;
    return result.toString();
}

function subtract(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1-num2;
    // result = Math.round(result*100)/100;
    return result.toString();
}

function multiply(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1*num2;
    // result = Math.round(result*(100))/100;
    return result.toString();
}

function divide(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1/num2;
    // result = Math.round(result*100)/100;
    return result.toString();
}

/*
On Operate unction call:
    > if only one operand exists (empty string) or no operator exists, return the
      number with a value
    > else, compute and return result
*/
function operate(num1, operator, num2) {
    if (num1 === "" || num2 === "" || operator === "") {
        if (num1 === "") { return num2 }
        else { return num1 }
    }
    let answer = "";
    switch (operator) {
        case "add":
            wittyRemarkField.textContent = "";
            answer = add(num1, num2);
            break;

        case "subtract":
            wittyRemarkField.textContent = "";
            answer = subtract(num1, num2);
            break;

        case "multiply":
            wittyRemarkField.textContent = "";
            answer = multiply(num1, num2);
            break;

        case "divide":
            if (num2 === "0") {
                wittyRemarkField.textContent = "Ha! Nice try champ. You just got reset";
                clear();
                return "0";
            }
            answer = divide(num1, num2);
            break;
        }
    console.log(`Raw Answer: ${answer}`);
    let numberDigitsOnly = answer.replace('.', '').replace('-', '');
    if (numberDigitsOnly.length > maxNumberLength) {
        return parseFloat(answer).toPrecision(maxNumberLength);
    }
    return answer;
}

function enterDecimal() {
    console.log(`Entered Decimal: .`);
    let numberDigitsOnly = currentNumber.replace('.', '').replace('-', '');
    if (currentNumber.includes('.') || numberDigitsOnly === maxNumberLength) { return }
    if (currentNumber === "") { 
        currentNumber = currentNumber + '0.';
    }
    else {
        currentNumber = currentNumber + '.';
    }
    evaluationField.textContent = currentNumber;

    lastEntry = "digit"; // still counts as a digit entry
}

function enterNegative() {
    console.log(`Entered Negative: -`);
    let negativeNumber = "";
    negativeNumber = (currentNumber !== "")
        ? currentNumber
        : previousNumber
    negativeNumber = (parseFloat(negativeNumber)*(-1.0)).toString();
    let numberDigitsOnly = negativeNumber.replace('.', '').replace('-', '');
    if (numberDigitsOnly.length > maxNumberLength) {
        evaluationField.textContent = parseFloat(negativeNumber).toPrecision(maxNumberLength);
    }
    else {
        evaluationField.textContent = negativeNumber;
    }
    if (currentNumber !== "") { currentNumber = negativeNumber }
    else { previousNumber = negativeNumber }
}

/*
On Digit entry:
    > if LastEntry = nothing (this handles the 1st entry case)
        * set PreviousNumber as CurrentNumber
        * reset CurrentNumber
    > if CurrentOperator exists and CurrentOperator highlight is on, turn it off
    > if CurrentNumber (wihout decimals) is 8 characters long
        * return
    > add Digit to CurrentNumber
    > display CurrentNumber
    > set LastEntry as "digit"
*/
function enterDigit() {
    if (lastEntry === "") {
        previousNumber = currentNumber;
        currentNumber = "";
    }

    const currentOperatorBtn = document.querySelector(`button[name='${currentOperator}']`);
    if (currentOperatorBtn !== null && currentOperatorBtn.classList.contains("selected") === true) {
        currentOperatorBtn.classList.remove("selected"); // toggling OFF
    }

    let currentNumberNoDecimals = currentNumber.split('.').join("");
    if (currentNumberNoDecimals.length === maxNumberLength) { return }

    thisDigit = this.textContent;
    console.log(`Entered Digit: ${thisDigit}`);

    currentNumber = currentNumber + thisDigit;
    evaluationField.textContent = currentNumber;

    lastEntry = "digit";
}

/*
On Operator entry:
    > if LastEntry was an Operator
        * set CurrentOperator as the new Operator
        * change the UI highlight from old to new
        * return (skip the rest)
    > if CurrentOperator already exists
        * compute PreviousNumber, CurrentOperator, CurrentNumber
        * store result in PreviousNumber
        * reset CurrentNumber
        * turn on the highlight of the New Operator
        * set CurrentOperator as the New Operator
    > else if LastEntry was Equals
        * turn on the highlight of the New Operator
        * set CurrentOperator as the New Operator
    > else
        * turn on the highlight of the New Operator
        * set CurrentOperator as the New Operator
        * set PreviousNumber as CurrentNumber
        * reset CurrentNumber
    > set LastEntry as "operator"
*/
function enterOperator() {
    let newOperator = this.name;
    console.log(`Entered Operator: ${newOperator}`);
    const currentOperatorBtn = document.querySelector(`button[name='${currentOperator}']`);
    const newOperatorBtn = document.querySelector(`button[name='${newOperator}']`);
    
    if (lastEntry === "operator") {
        currentOperatorBtn.classList.remove("selected"); // toggling OFF
        newOperatorBtn.classList.add("selected"); // toggling ON
        currentOperator = newOperator;
        return;
    }

    if (currentOperator !== "") {
        // then a previous operator exists and should be calculated
        previousNumber = operate(previousNumber, currentOperator, currentNumber);
        evaluationField.textContent = previousNumber;

        newOperatorBtn.classList.add("selected"); // toggling ON
        currentOperator = newOperator;
        currentNumber = "";
    }
    else if (lastEntry === "equals") {
        newOperatorBtn.classList.add("selected"); // toggling ON
        currentOperator = newOperator;
    }
    else {
        newOperatorBtn.classList.add("selected"); // toggling ON
        currentOperator = newOperator;
        previousNumber = currentNumber;
        currentNumber = "";
    }

    lastEntry = "operator";
}

/*
On Equals entry:        
    > if LastEntry = Digit
        * compute PreviousNumber, Operator, CurrentNumber
        * store result in PreviousNumber
    > if LastEntry = Operator
        * there is no CurrentNumber, so we perform operation on the PreviousNumber
        * compute PreviousNumber, CurrentOperator, PreviousNumber
        * store result in PreviousNumber
    > if LastEntry = Equals
        * compute PreviousNumber, CurrentOperator, CurrentNumber
            - should return the PreviousNumber since CurrentNumber is empty
        * store result in PreviousNumber
    > reset CurrentOperator highlight (if there is one)
    > display PreviousNumber
    > reset CurrentNumber & CurrentOperator
    > set LastEntry as "Equals"
*/
function enterEquals() {
    console.log(`Entered Equals: =`);

    if (lastEntry === "digit" || lastEntry === "equals") {
        previousNumber = operate(previousNumber, currentOperator, currentNumber);
    }

    if (lastEntry === "operator") {
        previousNumber = operate(previousNumber, currentOperator, previousNumber);
    }

    if (currentOperator !== "") {
        const currentOperatorBtn = document.querySelector(`button[name='${currentOperator}']`);
        currentOperatorBtn.classList.remove("selected"); // toggling OFF
    }
    
    evaluationField.textContent = previousNumber;
    currentNumber = "";
    currentOperator = "";

    lastEntry = "equals";
}

function clear() {
    const currentOperatorBtn = document.querySelector(`button[name='${currentOperator}']`);
    if (currentOperatorBtn !== null) {
        currentOperatorBtn.classList.remove("selected");
    }
    currentNumber = "0";
    previousNumber = "";
    currentOperator = "";
    lastEntry = "";
    evaluationField.textContent = currentNumber;
}

let currentNumber = "0";
let previousNumber = "";
let currentOperator = "";
let lastEntry = "";

/* console.log(operate("1", "+", "3"));
console.log(operate("4.4444", "-", "3"));
console.log(operate("1.12345", "*", "3"));
console.log(operate("3.5", "/", "0")); */

let maxNumberLength = 10;
const evaluationField = document.querySelector(".evaluation-field");
const wittyRemarkField = document.querySelector(".witty-remark-container");

const digitButtons = document.querySelectorAll("button.digit");
digitButtons.forEach(digitButton => digitButton.addEventListener("click", enterDigit));

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", enterDecimal);

const negativeButton = document.querySelector("#negative");
negativeButton.addEventListener("click", enterNegative);

const operatorButtons = document.querySelectorAll("#operator");
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", enterOperator));

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", enterEquals);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);