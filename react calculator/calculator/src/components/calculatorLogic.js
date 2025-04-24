export function createCalculatorLogic() {
    let display = "0";
    let expression = "";
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
  
    const getState = () => ({ display, expression });
  
    const inputDigit = (digit) => {
      if (waitingForSecondOperand) {
        display = digit;
        waitingForSecondOperand = false;
  
        const parts = expression.split(" ");
        parts[parts.length - 1] = digit;
        expression = parts.join(" ");
      } else {
        display = display === "0" ? digit : display + digit;
        if (expression === "" || expression === "0") {
          expression = digit;
        } else {
          expression += digit;
        }
      }
    };
  
    const inputDecimal = () => {
      if (waitingForSecondOperand) {
        display = "0.";
        expression += " 0.";
        waitingForSecondOperand = false;
        return;
      }
      if (!display.includes(".")) {
        display += ".";
        expression += ".";
      }
    };
  
    const clear = () => {
      display = "0";
      expression = "";
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
    };
  
    const toggleSign = () => {
      if (display === "0") return;
      display = display.startsWith("-") ? display.slice(1) : "-" + display;
  
      const parts = expression.split(" ");
      parts[parts.length - 1] = display;
      expression = parts.join(" ");
    };
  
    const performCalculation = (first, second, operator) => {
      switch (operator) {
        case "+":
          return first + second;
        case "-":
          return first - second;
        case "*":
          return first * second;
        case "/":
          return first / second;
        case "%":
          return first * (second / 100);
        default:
          return second;
      }
    };
  
    const inputOperator = (nextOperator) => {
      const inputValue = parseFloat(display);
  
      if (waitingForSecondOperand && nextOperator === "-") {
        display = "-";
        const parts = expression.trim().split(" ");
        const last = parts[parts.length - 1];
        if (!last || ["+", "-", "×", "÷", "%"].includes(last)) {
          parts.push("-");
        } else {
          parts[parts.length - 1] = "-" + last;
        }
        expression = parts.join(" ");
        waitingForSecondOperand = false;
        return;
      }
  
      if (firstOperand === null) {
        firstOperand = inputValue;
      } else if (operator && !waitingForSecondOperand) {
        const result = performCalculation(firstOperand, inputValue, operator);
        display = String(result);
        firstOperand = result;
        expression = String(result);
      }
  
      const operatorSymbol =
        nextOperator === "+" ? " + " :
        nextOperator === "-" ? " - " :
        nextOperator === "*" ? " × " :
        nextOperator === "/" ? " ÷ " :
        " % ";
  
      expression = expression.trim() + operatorSymbol;
      operator = nextOperator;
      waitingForSecondOperand = true;
    };
  
    const calculateResult = () => {
      if (operator === null || firstOperand === null) return;
      const result = performCalculation(firstOperand, parseFloat(display), operator);
      display = String(result);
      expression += " = " + result;
      firstOperand = result;
      operator = null;
      waitingForSecondOperand = true;
    };
  
    return {
      getState,
      inputDigit,
      inputDecimal,
      inputOperator,
      calculateResult,
      clear,
      toggleSign
    };
  }
  