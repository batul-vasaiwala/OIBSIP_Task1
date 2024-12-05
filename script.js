let display = document.getElementById("display");
let currentInput = "";     // Stores the current input from the user
let operator = null;       // Stores the current operator
let firstOperand = null;   // Stores the first operand
let fullExpression = "";   // Full expression to display

function appendNumber(number) {
    currentInput += number; // Add number to current input
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === "" && op === '-') {
        // Allow starting with a negative number
        currentInput += op;
        updateDisplay();
        return;
    }

    if (firstOperand === null) {
        // If no first operand, set it and assign the operator
        firstOperand = parseFloat(currentInput);
        operator = op;
        fullExpression = currentInput + " " + operator + " ";
        currentInput = "";
    } else if (operator) {
        // If there's an existing operation, calculate result
        calculate();
        operator = op; // Assign new operator
        fullExpression = firstOperand + " " + operator + " ";
        currentInput = ""; // Reset input for next operand
    }
    updateDisplay();
}

function calculate() {
    if (operator && firstOperand !== null && currentInput !== "") {
        let secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "x":
                result = firstOperand * secondOperand;
                break;
            case "/":
                result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
                break;
        }

        currentInput = result.toString();
        fullExpression = ""; // Reset the full expression after result
        firstOperand = result;
        operator = null; // Clear operator after calculation
        updateDisplay();
    }
}

function equals() {
    // Trigger calculation and reset expression display
    calculate();
    fullExpression = currentInput; // Display only result
}

function clearDisplay() {
    currentInput = "";
    operator = null;
    firstOperand = null;
    fullExpression = ""; // Clear full expression
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = fullExpression + currentInput; // Show full expression and current input together
}
