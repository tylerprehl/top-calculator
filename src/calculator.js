

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
    let result = num1/num2;
    result = Math.round(result*100)/100;
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
    switch (operator) {
        case "add":
            wittyRemarkField.textContent = "";
            return add(num1, num2);

        case "subtract":
            wittyRemarkField.textContent
            return subtract(num1, num2);

        case "multiply":
            wittyRemarkField.textContent = "";
            return multiply(num1, num2);

        case "divide":
            if (num2 === "0") {
                wittyRemarkField.textContent = "Ha! Nice try champ. You just got reset"
                clear();
                return "0"
            }
            let result = divide(num1, num2);
            return result;
    }
}

/*
On Digit entry:
    > if LastEntry = nothing (this handles the 1st entry case)
        * set PreviousNumber as CurrentNumber
        * reset CurrentNumber
    > if CurrentOperator exists and CurrentOperator highlight is on, turn it off
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
    if (currentOperatorBtn !== null && currentOperatorBtn.classList.item("active") === true) {
        currentOperatorBtn.classList.toggle("active"); // toggling OFF
    }

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
        currentOperatorBtn.classList.toggle("active"); // toggling OFF
        newOperatorBtn.classList.toggle("active"); // toggling ON
        currentOperator = newOperator;
        return;
    }

    if (currentOperator !== "") {
        // then a previous operator exists and should be calculated
        previousNumber = operate(previousNumber, currentOperator, currentNumber);
        evaluationField.textContent = previousNumber;

        newOperatorBtn.classList.toggle("active"); // toggling ON
        currentOperator = newOperator;
        currentNumber = "";
    }
    else if (lastEntry === "equals") {
        newOperatorBtn.classList.toggle("active"); // toggling ON
        currentOperator = newOperator;
    }
    else {
        newOperatorBtn.classList.toggle("active"); // toggling ON
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
        currentOperatorBtn.classList.toggle("active"); // toggling OFF
    }
    
    evaluationField.textContent = previousNumber;
    currentNumber = "";
    currentOperator = "";

    lastEntry = "equals";
}

function clear() {
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

const evaluationField = document.querySelector(".evaluation-field");
const wittyRemarkField = document.querySelector(".witty-remark-container");

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
- implement rounding to maximum digit amount
- how the display gets updated:
    > if you enter a digit, that digit gets displayed at ANY time
    > if you enter an operator, if there is a previous operator (that is NOT 
        and equals sign), sum the previous and current numbers and display result
    > if you enter the equal sign:
        * after =: repeat last operation (if you just did 5+3, redo the +3)
        * after number: perform previous operation
*/


/*
CALCULATOR FUNCTIONALITY

Starting Number1 is 0 (until you specify otherwise)

Enter Equals (Operator and/or Number2 DNE)
    > display current value

Enter Number1, Operator, Equals (Number2 DNE)
    > copy Number1 to Number2, perform Operation to store in the form:
        * Number1 = Result, (next entry)

Enter Number1, LastOperator, Number2, CurrentOperator
    > evaluate Number1/Number2 with LastOperator, save result so we have the form:
        * Number1 = Result, LastOperator = CurrentOperator, (next entry)
    > if we continue to enter alternating Numbers/Operators, this can continue until...
        * continuing to enter digits will create bigger number, can only save one value into
          Operator at a time (if LastEntry = an Operator, switch Operator value)

Enter Number1, Operator, Number2, Equals
    > produce result, so we have the form:
        * Result, (next entry)
    > upon pressing equals AGAIN, repeat operation in the form:
        * Result, Operator, Number2 
            - results again in Result, (next entry)

Enter Number1, Operator, Equals, NumberN, Equals
    > from the first 3 entries, we have Number1 and Number2 as the same number
    > on the final Equals, NumberN will replace Number2 to compute Number1 Operator NumberN

Enter Number1, Operator, Number2, Equals, NumberN, Equals
    > from the first 4 entries, we have result as Number1
    > NumberN replaces Number 2
    > recompute such that it solves Number1 Operator NumberN, NOT Result Operator NumberN


IMPLEMENTATION

Number entry can go up until certain digit length or until operator or equals is selected

OPERATORS SIGNAL THE CHANGE OF CURRENT NUOn Equals entry:        
    > if LastEntry = Digit
        * compute PreviousNumber, Operator, CurrentNumber
        * store result in PreviousNumber
        * reset CurrentNumber
        * reset CurrentOperator
    > if LastEntry = Operator
        * set CurrentNumber as PreviousNumber (TWIN)
        * compute PreviousNumber, CurrentOperator, CurrentNumber
        * store result in PreviousNumber
        * reset CurrentNumber
    > if LastEntry = Equals
        * compute PreviousNumber, CurrentOperator, CurrentNumber
            - should return the PreviousNumber
        * store result in PreviousNumber
        * display PreviousNumber
        * reset CurrentOperator/CurrentNumber
    > set LastEntry as "Equals"MBER BEING SAVED TO PREVIOUS NUMBER
(excluding for initial set)





PreviousNumber = "";
CurrentNumber = "0";
CurrentOperator = "";
LastEntry = "";


*/