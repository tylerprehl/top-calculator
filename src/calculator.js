

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
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);

        case "/":
            let result = divide(num1, num2);
            if (result === "divide by 0") {
                currentNumber = 0;
                secondNumber = 0;
                currentNumber = "";
                return "Ha! Nice try champ. You just got reset"
            }
            return result;
    }
}

let display = "";
let currentNumber = "";
let secondNumber = "";
let currentOperator = "";

console.log(operate("1", "+", "3"));
console.log(operate("4.4444", "-", "3"));
console.log(operate("1.12345", "*", "3"));
console.log(operate("3.5", "/", "0"));

/*
Ideas for how to implement calculator (to prevent certain issues):
- event listener for digits
- event listener for operators
- after an operator is selected (+, -, *, /, =), disable operator buttons until 
  a number is selected
- implement maximum digit amount
*/