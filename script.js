/* Global Elements */
const operatorSymbols = ["+", "-", "\u00D7", "÷"];
const shortcutKeys = ["Backspace", "Shift", "Enter", "=", "a", "+", "s", "-", 
        "m", "*", "d", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const calculatorGrid = document.querySelector(".calculator-grid");
const displayCurrent = document.getElementById("current");
const displayPrevious = document.getElementById("previous");
const shortcutsContainer = document.querySelector(".shortcuts-container");

/* Mobile Layout Setting */
if (window.innerWidth < 811) {
    calculatorGrid.style.width = `${window.innerWidth-10}px`;
    calculatorGrid.style.height = `${window.innerHeight-10}px`;
}

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
    let items = text.split(" ").filter(i => i); // filter out empty items
    if (items.length < 3) {
        displayPrevious.textContent = `${items[0]} =`;
        displayCurrent.textContent = items[0];
        return;
    }
    let result = operate(items[0], items[1], items[2]);
    displayPrevious.textContent = displayCurrent.textContent + " =";
    displayCurrent.textContent = result % 1 ? result.toPrecision(4): result;
}

/* Display Functions */
const updateDisplay = (clickEvent) => {
    let element = clickEvent.target;
    let elementValue = element.localName == "p" ? element.textContent :
             element.firstElementChild.textContent;
    let stringItems = displayCurrent.textContent.split(" ").filter(i => i);
    if (operatorSymbols.includes(stringItems[stringItems.length-1]) &&
            operatorSymbols.includes(elementValue)) {
        return;
    }
    if (stringItems.length == 3 && operatorSymbols.includes(elementValue)) {
        solveEquation(displayCurrent.textContent);
        return;
    }
    if (elementValue == ".") {
        let hasDecimal = stringItems[stringItems.length-1].includes(".");
        if (hasDecimal == true) {
            return;
        } else {
            displayCurrent.textContent += elementValue;
        }
    } else if (numberKeys.includes(elementValue)) {
        displayCurrent.textContent += elementValue;
    } else if (operatorSymbols.includes(elementValue)) {
        displayCurrent.textContent += ` ${elementValue} `;
    } else if (elementValue == "C") {
        displayCurrent.textContent = "";
    } else if (elementValue == "←") {
        displayCurrent.textContent = displayCurrent
        .textContent
        .slice(0, -1); 
    } else if (elementValue == "=") {
        solveEquation(displayCurrent.textContent);
    }
}

const toggleShortcutsView = () => {
    let showShortcuts = document.getElementById("show-shortcuts");
    let shortcutsKey = document.getElementById("shortcuts-key");
    showShortcuts.classList.toggle("hide");
    shortcutsKey.classList.toggle("hide");
}
 
/* Listener Function */
const buttons = document.querySelectorAll("button");
buttons.forEach( (button) => {
    button.addEventListener("click", updateDisplay);
})

document.addEventListener("keyup", (keyEvent) => {
    if (shortcutKeys.includes(keyEvent.key)) {keyEvent.preventDefault()};
    if (keyEvent.key == "Delete") {
        document.getElementById("clear").click();
        return;
    }else if (keyEvent.key == "Backspace") {
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
    } else if (keyEvent.key == "-"|| keyEvent.key == "s") {
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
    }else if (keyEvent.key == ".") {
        document.getElementById("decimal").click();
        return;
    } else if (keyEvent.key == "d") {
        document.getElementById("divide").click();
        return; 
    }
})


shortcutsContainer.addEventListener("click", toggleShortcutsView);




/* 
"Backspace", "Shift", "Enter", "7"

, "8", "9", 
case "+",
case "4",
case "5",
case "6",
case "-":
case "1":
case "2":
case "3":
case "*":
case "0":
case ".":
*/