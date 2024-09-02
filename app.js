  const display = document.querySelector(".calc-display");
  const keys = document.querySelector(".calc-buttons");

  let expression = [];
  let buffer = "";
  let parenthesesCount = 0;

  // Add event listener to calculator keys
  keys.addEventListener("click", cumFunc);

  function cumFunc(event) {
    const { target } = event;
    const { value } = target;

    if (/\d/.test(value)) {
      // Handle number input
      if (buffer === '' && (/(^\-?\d+(\.\d+)?$)/).test(expression[expression.length - 1])) {
        expression = [];
      }
      buffer += value;
    } else if (value === ".") {
      // Handle decimal point
      if (!buffer.includes(value)) {
        buffer += buffer === "" ? `0${value}` : value;
      }
    } else if (target.classList.contains("operator")) {
      // Handle operator input
      if (buffer !== "") {
        expression.push(buffer);
        buffer = "";
      }
      if (expression.length > 0 && /(^\-?\d+(\.\d+)?$)/.test(expression[expression.length - 1])) {
        expression.push(value);
      } else if (expression.length > 0 && expression[expression.length - 1] === ")") {
        expression.push(value);
      }
    } else if (target.classList.contains("operator-percentage")) {
      // Handle percentage
      if (buffer !== "") {
        expression.push(String(parseFloat(buffer) / 100));
        buffer = "";
      }
    } else if (value === "()") {
      // Handle parentheses
      if (buffer !== "") {
        expression.push(buffer);
        buffer = "";
      }
      if (parenthesesCount === 0 && expression.length === 0) {
        expression.push("(");
        parenthesesCount++;
      } else if (/[\d)]/.test(expression[expression.length - 1])) {
        expression.push(")");
        parenthesesCount--;
      } else {
        expression.push("(");
        parenthesesCount++;
      }
    } else if (value === "+|-") {
      // Handle sign change
      buffer = buffer.startsWith("-") ? buffer.slice(1) : `-${buffer}`;
    } else if (value === "=") {
      // Handle calculation
      if (buffer !== "") {
        expression.push(buffer);
        buffer = "";
      }
      
        if (infChecker(expression)) {
          clearFunc();
          display.innerText = 'error';
          return;
        } else {
          if(parenthesesCount > 0){
            display.innerText = 'error';
            return;
          }
          display.innerText = calculator(splicer(expression));
        }
      
    } else if (value === "C") {
      // Handle clear
      clearFunc();
      display.innerText = "";
    } else if (value === "⌫") {
      // Handle backspace
      if (buffer !== "") {
        buffer = buffer.slice(0, -1);
      } else if (expression.length > 0) {
        let last = expression.pop();
        if (last.includes("(")) {
          parenthesesCount--;
        } else if (last.includes(")")) {
          parenthesesCount++;
        } else if (last.length > 1) {
          expression.push(last.slice(0, -1));
        }
      }
    }

    display.innerText = expression.join("") + buffer;
  }

  // Splicer function to handle parentheses
  function splicer(array) {
    while (array.includes("(")) {
      let start = array.lastIndexOf("(");
      let end = array.indexOf(")", start);
      let subArray = array.slice(start + 1, end);
      let result = calculator(subArray).toString();
      array.splice(start, end - start + 1, result);
    }
    return array;
  }

  // Calculator function
  function calculator(array) {
    // Handle multiplication and division
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "/" || array[i] === "*") {
        let result = array[i] === "/" ?
          parseFloat(array[i - 1]) / parseFloat(array[i + 1]) :
          parseFloat(array[i - 1]) * parseFloat(array[i + 1]);
        array.splice(i - 1, 3, result);
        i--;
      }
    }

    // Handle addition and subtraction
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "+" || array[i] === "-") {
        let result = array[i] === "+" ?
          parseFloat(array[i - 1]) + parseFloat(array[i + 1]) :
          parseFloat(array[i - 1]) - parseFloat(array[i + 1]);
        array.splice(i - 1, 3, result);
        i--;
      }
    }

    return array[0].toString();
  }

  // Error check function for division by zero
  const infChecker = (array) => array.some((item, index) => item === "/" && array[index + 1] === "0");

  // Clear function
  const clearFunc = () => {
    buffer = "";
    expression = [];
    parenthesesCount = 0;
  };