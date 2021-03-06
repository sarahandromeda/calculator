/* Global Elements */
const operatorSymbols = ["+", "-", "\u00D7", "÷", "="];
const shortcutKeys = ["Backspace", "Shift", "Enter", "=", "a", "+", "s", "-",
    "m", "*", "d", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const calculatorGrid = document.querySelector(".calculator-grid");
const displayCurrent = document.getElementById("current");
const displayPrevious = document.getElementById("previous");
const shortcutsContainer = document.querySelector(".shortcuts-container");

/* Mobile Layout Setting */
if (window.innerWidth < 811) {
    calculatorGrid.style.width = `${window.innerWidth - 10}px`;
    calculatorGrid.style.height = `${window.innerHeight - 10}px`;
}

/* Equation Functions */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const squared = (a) => a ** 2;
const cubed = (a) => a ** 3;
const exponent = (a, b) => a ** b;
const squareRoot = (a) => a ** (1 / 2);
const cubeRoot = (a) => a ** (1 / 3);
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

/* Calculator Functions */
const operate = (num1, sign, num2) => {
    let result;
    switch (sign) {
        case "+":
            result = add(+num1, +num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "\u00D7":
            result = multiply(num1, num2);
            break;
        case "÷":
            if (num2 == 0) {
                result = "Nice try...";
                break;
            } else {
                result = divide(num1, num2);
                break;
            }
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
    let items = text.split(" ").filter(i => i); // filter out empty items
    if (items.length < 3) {
        displayPrevious.textContent = `${items[0]} =`;
        displayCurrent.textContent = items[0];
        return;
    }
    let result = operate(items[0], items[1], items[2]);
    displayPrevious.textContent = displayCurrent.textContent + " =";
    displayCurrent.textContent = result % 1 ? result.toPrecision(4) : result;
}

/* Display Functions */
const updateDisplay = (clickEvent) => {
    let element = clickEvent.target;
    let elementValue = element.localName == "p" ? element.textContent :
        element.firstElementChild.textContent;
    let stringItems = displayCurrent.textContent.split(" ").filter(i => i);
    let lastItem = stringItems[stringItems.length - 1];

    // Reset display after divide by zero on click
    if (displayCurrent.textContent == "Nice try...") {
        displayCurrent.textContent = "";
    }

    // Check if there is already an operator
    if (operatorSymbols.includes(lastItem) &&
        operatorSymbols.includes(elementValue)) {
        return;
    }

    // If one pair of numbers has been entered, always solve on next click
    if (stringItems.length == 3 && operatorSymbols.includes(elementValue)) {
        solveEquation(displayCurrent.textContent);
        return;
    }

    if (element.classList == "negative") {
        // if there's no number in display[0] or diaply[2] print negative
        if (stringItems.length < 1 || operatorSymbols.includes(lastItem)) {
            displayCurrent.textContent += "-";
            return;
        } else if (+lastItem && +lastItem > 0) {
            stringItems[stringItems.length - 1] = `-${lastItem}`;
            displayCurrent.textContent = stringItems.join(" ");
            return;
        } else if (+lastItem && +lastItem < 0) {
            // if there is a number and its negative, change it to positive
            stringItems[stringItems.length - 1] = lastItem.slice(1);
            displayCurrent.textContent = stringItems.join(" ");
            return;
        }
    } else if (elementValue == ".") {
        if (stringItems.length < 1) {
            displayCurrent.textContent += elementValue;
            return
        } else {
            let hasDecimal = lastItem.includes(".");
            if (hasDecimal == true) {
                return;
            } else {
                displayCurrent.textContent += elementValue;
                return
            }
        }
    } else if (elementValue == "=") {
        solveEquation(displayCurrent.textContent);
    } else if (operatorSymbols.includes(elementValue)) {
        if (lastItem == ".") {
            return;
        } else {
            displayCurrent.textContent += ` ${elementValue} `;
            return
        }
    } else if (elementValue == "C") {
        displayCurrent.textContent = "";
        return
    } else if (elementValue == "←") {
        displayCurrent.textContent = displayCurrent
            .textContent
            .slice(0, -1);
        return;
    } else if (numberKeys.includes(elementValue)) {
        displayCurrent.textContent += elementValue;
        return;
    }
}

const toggleShortcutsView = () => {
    let shortcutsKey = document.getElementById("shortcuts-key");
    shortcutsKey.classList.toggle("hide");
}

/* Listener Function */
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", updateDisplay);
})

document.addEventListener("keyup", (keyEvent) => {
    if (shortcutKeys.includes(keyEvent.key)) { keyEvent.preventDefault() };
    if (keyEvent.key == "Delete") {
        document.getElementById("clear").click();
        return;
    } else if (keyEvent.key == "Backspace") {
        document.getElementById("delete").click();
        return;
    } else if (keyEvent.key == "Enter" || keyEvent.key == "=") {
        document.getElementById("equals").click();
        return;
    } else if (keyEvent.key == "7") {
        document.getElementById("seven").click();
        return;
    } else if (keyEvent.key == "8") {
        document.getElementById("eight").click();
        return;
    } else if (keyEvent.key == "9") {
        document.getElementById("nine").click();
        return;
    } else if (keyEvent.key == "+" || keyEvent.key == "a") {
        document.getElementById("add").click();
        return;
    } else if (keyEvent.key == "4") {
        document.getElementById("four").click();
        return;
    } else if (keyEvent.key == "5") {
        document.getElementById("five").click();
        return;
    } else if (keyEvent.key == "6") {
        document.getElementById("six").click();
        return;
    } else if (keyEvent.key == "-" || keyEvent.key == "s") {
        document.getElementById("subtract").click();
        return;
    } else if (keyEvent.key == "1") {
        document.getElementById("one").click();
        return;
    } else if (keyEvent.key == "2") {
        document.getElementById("two").click();
        return;
    } else if (keyEvent.key == "3") {
        document.getElementById("three").click();
        return;
    } else if (keyEvent.key == "*" || keyEvent.key == "m") {
        document.getElementById("multiply").click();
        return;
    } else if (keyEvent.key == "0") {
        document.getElementById("zero").click();
        return;
    } else if (keyEvent.key == ".") {
        document.getElementById("decimal").click();
        return;
    } else if (keyEvent.key == "d") {
        document.getElementById("divide").click();
        return;
    }
})


shortcutsContainer.addEventListener("click", toggleShortcutsView);