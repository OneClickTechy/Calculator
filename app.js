const display = document.querySelector(".calc-display"); //display
const keys = document.querySelector(".calc-buttons"); //calculator keys

let expression = [];
let buffer = "";
let parenthesesBug = 0;
let calculateStatus = false;

//add event listener to calc keys
keys.addEventListener("click", cumFunc);

function cumFunc(event) {
  const { target } = event;
  const { value } = target;

  if (/\d/.test(value)) {
    //if enter number
    buffer += value;
    console.log(buffer);
  } else if (value === ".") {
    //if enter dot
    if (!buffer.includes(value) && /\d/.test(buffer[buffer.length - 1])) {
      console.log(true);
      buffer += value;
      console.log(buffer);
    } else if (buffer === "") {
      buffer += `0${value}`;
      console.log(buffer);
    } else {
      console.log(false);
    }
    console.log(value);
  } else if (target.classList.contains("operator")) {
    //if enter operator
    console.log("operator" + value);
    if (
      buffer !== "" ||
      /^-?\d+(\.\d)?$/.test(expression[expression.length - 1])
    ) {
      console.log("buffer pushed");
      expression.push(buffer);
      console.log(expression);
      buffer = "";
      console.log(`${buffer} is empty`);
      expression.push(value);
      console.log(expression);
    } else if (buffer === "" && expression[expression.length - 1] === ")") {
      expression.push(value);
    }
  } else if (target.classList.contains("operator-percentage")) {
    //if enter %
    console.log(value);
    if (buffer !== "") {
      expression.push(String(parseFloat(buffer) / 100));
      buffer = "";
      console.log(expression);
    }
  } else if (value === "()") {
    //if enter target is ()
    console.log("()");
    if (buffer !== "") {
      expression.push(buffer);
      buffer = "";
      console.log("buffer is not empty so pushed", expression);
    }
    if ((parenthesesBug === 0) & (expression.length === 0)) {
      //from begin () is clicked
      expression.push("(");
      console.log(expression);
      parenthesesBug++;
    } else if (
      expression[expression.length - 1] === "/" ||
      expression[expression.length - 1] === "*" ||
      expression[expression.length - 1] === "+" ||
      expression[expression.length - 1] === "-"
    ) {
      expression.push("(");
      parenthesesBug++;
    } else if (/^-?\d+(\.\d)?$/.test(expression[expression.length - 1])) {
      //if click after number
      if (parenthesesBug > 0) {
        expression.push(")");
        parenthesesBug--;
        console.log(expression);
      } else if (parenthesesBug === 0) {
        expression.push("*", "(");
        parenthesesBug++;
        console.log(expression);
      }
    } else if (expression[expression.length - 1] === "(") {
      expression.push("(");
      parenthesesBug++;
    } else if (expression[expression.length - 1] === ")") {
      if (parenthesesBug > 0) {
        expression.push(")");
        parenthesesBug--;
      } else if (parenthesesBug === 0) {
        expression.push("*", "(");
        parenthesesBug++;
      }
    }
  } else if (value === "+|-") {
    //if value is plus or minus
    if (buffer.includes("-")) {
      console.log(`${buffer} have -`);
      buffer = buffer.slice(1);
      console.log(buffer);
    } else {
      console.log("no -");
      buffer = "-" + buffer;
      console.log(buffer);
    }
    console.log("sign ", value);
  } else if (value === "=") {
    //if calculate is trigger
    console.log("calculate begin");
    if (buffer !== "") {
      expression.push(buffer);
      buffer = "";
      console.log(expression);
    }
    if (parenthesesBugCheck(expression)) {
      if (infChecker(expression) === true) {
        console.log('error found');
        clearFunc();
        console.error("can't divide by 0");
        console.log(buffer, expression, parenthesesBug);    
        display.innerText = 'error'; 
        return;

      } else {
        console.log("parenthesis are equal\n", expression);
        display.innerText = "";
        display.innerText = calculator(splicer(expression));
      }
    } else {
      display.innerText = "error";
    }
  } else if (value === "C") {
    //if value is clear
    console.log("clear");
    clearFunc();
    display.innerText = null;
  } else if (value === "⌫") {
    //if value is backspace
    console.log("backspace is triggered");
    if (buffer !== "") {
      //delete from buffer if buffer is not empty

      console.log("delete from buffer - ", buffer);
      const stringSplitPop = buffer.split("");
      stringSplitPop.pop();
      console.log(stringSplitPop);
      buffer = stringSplitPop.join("");
      console.log("after delete", buffer);
    } else if (buffer === "" && expression.length > 0) {
      //if expression have some value
      console.log("buffer is empty and delete from -", expression);
      if (expression[expression.length - 1].match(/\(/)) {
        console.log("remove from array - ", expression);
        expression.pop();
        console.log("after delete", expression);
        console.log("before :", parenthesesBug);
        parenthesesBug--;
        console.log("after :", parenthesesBug);
      } else if (expression[expression.length - 1].match(/\)/)) {
        console.log("remove from array - ", expression);
        expression.pop();
        console.log("after delete", expression);
        console.log("before :", parenthesesBug);
        parenthesesBug++;
        console.log("after :", parenthesesBug);
      } else {
        console.log("in else");
        if (expression[expression.length - 1].length === 1) {
          expression.pop();
        } else if (expression[expression.length - 1].length > 1) {
          console.log(expression);
          const lastEl = expression[expression.length - 1].split("");
          console.log(lastEl);
          lastEl.pop();
          console.log(lastEl);
          expression.splice(-1, 1, lastEl.join(""));
          console.log(expression);
        }
      }
    }
  }
  console.log("buffer :", buffer);
  console.log("exp : ", expression);
  console.log("parC", parenthesesBug);

  display.innerText = expression.join("") + " " + buffer;
}

//parenthesis balance checker function
function parenthesesBugCheck(array) {
  let opc = 0;
  let cpc = 0;

  array.map((i) => {
    if (i === "(") {
      opc++;
    } else if (i === ")") {
      cpc++;
    }
  });
  return opc === cpc ? true : false;
}

//calculator function

//splicer function uses: split the array from ( to ) and calculate inner values and return single value
function splicer(array) {
  while (array.includes("(")) {
    let obi = array.lastIndexOf("(");
    let cbi;
    for (let i = obi + 1; obi < array.length - 1; i++) {
      if (array[i] === ")") {
        cbi = i;
        break;
      }
    }
    let tempArr = array.slice(obi + 1, cbi);
    let result = calculator(tempArr).toString();
    console.log("result : ", result, typeof result);
    console.log(obi, cbi);
    const count = cbi - obi + 1;
    array.splice(obi, count, result);
  }
  return array;
}

function calculator(array) {
  let ans;

  // division and multiplication
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "/") {
      ans = parseFloat(array[i - 1]) / parseFloat(array[i + 1]);
      array.splice(i - 1, 3, ans);
      i--; // Adjust index after splicing
    } else if (array[i] === "*") {
      ans = parseFloat(array[i - 1]) * parseFloat(array[i + 1]);
      array.splice(i - 1, 3, ans);
      i--; // Adjust index after splicing
    }
  }

  // addition and subtraction
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "+") {
      ans = parseFloat(array[i - 1]) + parseFloat(array[i + 1]);
      array.splice(i - 1, 3, ans);
      i--; // Adjust index after splicing
    } else if (array[i] === "-") {
      ans = parseFloat(array[i - 1]) - parseFloat(array[i + 1]);
      array.splice(i - 1, 3, ans);
      i--; // Adjust index after splicing
    }
  }

  // The final result should be the only element left in the array
  array[0] = array[0].toString(); //convert a number into string for work all functions perfectly
  return array[0]; //return final value and the array length should be 1.
}

//error check function
const infChecker = (array) => {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === "/" && array[index + 1] === "0") {
      return true;
    }
  }
  return false;
};

//clearFunc
const clearFunc = () => {
  buffer = "";
  expression = [];
  parenthesesBug = 0;
};
