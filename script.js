/* Global Elements */
const displayCurrent = document.getElementById("current");
const displayPrevious = document.getElementById("previous");

/* Equation Functions */
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const squared = (a) => a ** 2;
const cubed = (a) => a ** 3;
const exponent = (a,b) => a ** b;
const squareRoot = (a) => a ** (1/2);
const cubeRoot = (a) => a ** (1/3);
const factorial = (a) => {
    if (a < 0) return undefined;
    if (a == 0) return 1;
    let x = a - 1;
    while (x > 1) {
        a *= x;
        x--;
    }
    return a;
};

const operate = (num1, sign, ...nums) => {
    let result;
    switch (sign) {
        case "+":
            result = add(+num1, +num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "×":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = divide(num1, num2);
            break;
        case "** 2":
            result = squared(num1);
            break;
        case "** 3":
            result = cubed(num1);
            break;
        case "**":
            result = exponent(num1, num2);
            break;
        case "square root":
            result = squareRoot(num1);
            break;
        case "cube root":
            result = cubeRoot(num1);
            break;
        case "!":
            result = factorial(num1);
            break;
    }
    return result;
}

const solveEquation = (text) => {
    let items = text.split(" ");
    console.log(items);
    let result = operate(items[0], items[1], items[2]);
    displayPrevious.textContent = displayCurrent.textContent + " =";
    displayCurrent.textContent = result;
}

const updateDisplay = (clickEvent) => {
    let element = clickEvent.target;
    if (element.classList.contains("number")) {
        displayCurrent.textContent += element.textContent;
    } else if (element.classList.contains("operand")) {
        displayCurrent.textContent += ` ${element.textContent} `;
    } else if (element.classList.contains("punctuation")) {
        displayCurrent.textContent += element.textContent;
    } else if (element.id == "clear") {
        displayCurrent.textContent = "";
    } else if (element.id == "delete") {
        displayCurrent.textContent = displayCurrent
                .textContent
                .slice(0, displayCurrent.textContent.length - 2); 
    } else if (element.id == "equals") {
        solveEquation(displayCurrent.textContent);
    }
}

/* Listener Function */
const buttons = document.querySelectorAll("button");
buttons.forEach( (button) => {
    button.addEventListener("click", updateDisplay);
})



