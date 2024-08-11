let buttons = document.querySelectorAll(".for-calc");
let displayValue = "";
let display = document.getElementById("output");
let dataStore = [];
let buffer = "";
const operators = /[\*\/\+%-]/;
const percent = /[%]/;
const numbers = /[\d.]/;
const calc = /[=]/;
let answer = null;

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    //checke if input is equal to an % operator
    if (percent.test(e.target.value)) {
      if (buffer != "") {
        dataStore.push(buffer);
        dataStore.push("/");
        dataStore.push("100");
        dataStore.push("*");
        buffer = "";
      }
      //check if input is equal to an operator +-*/
    } else if (operators.test(e.target.value)) {
      console.log(e.target.value);
      if (buffer != "") {
        dataStore.push(buffer);
        buffer = "";
        dataStore.push(e.target.value);
      } else if (buffer == "") {
      }
      //check if input is equal to a number
    } else if (numbers.test(e.target.value)) {
      console.log(e.target.value);
      buffer += e.target.value;

      //calc
    } else if (calc.test(e.target.value)) {
      console.log(e.target.value);
      if (dataStore.length >= 2 && buffer !== "") {
        dataStore.push(buffer);
        buffer = "";

        while (dataStore.indexOf("%") >= 0) {
          const index = dataStore.indexOf("%");
          const result =
            parseFloat(dataStore[index - 1]) / parseFloat(dataStore[index + 1]);
          dataStore.splice(index - 1, 3, result);
          console.log(dataStore);
          console.log(result);
        }

        while (dataStore.indexOf("/") >= 0) {
          const index = dataStore.indexOf("/");
          const result =
            parseFloat(dataStore[index - 1]) / parseFloat(dataStore[index + 1]);
          dataStore.splice(index - 1, 3, result);
          console.log(dataStore);
          console.log(result);
        }

        while (dataStore.indexOf("*") >= 0) {
          const index = dataStore.indexOf("*");
          const result =
            parseFloat(dataStore[index - 1]) * parseFloat(dataStore[index + 1]);
          dataStore.splice(index - 1, 3, result);
          console.log(dataStore);
          console.log(result);
        }

        while (dataStore.indexOf("+") >= 0) {
          const index = dataStore.indexOf("+");
          const result =
            parseFloat(dataStore[index - 1]) + parseFloat(dataStore[index + 1]);
          dataStore.splice(index - 1, 3, result);
          console.log(dataStore);
          console.log(result);
        }

        while (dataStore.indexOf("-") >= 0) {
          const index = dataStore.indexOf("-");
          const result =
            parseFloat(dataStore[index - 1]) - parseFloat(dataStore[index + 1]);
          dataStore.splice(index - 1, 3, result);
          console.log(dataStore);
          console.log(result);
        }
      }
      // if (dataStore.length > 2) {
      //   for (let i = 0; i < dataStore.length; i++) {
      //     if (dataStore[i] === "/") {
      //       if (answer === null) {
      //         answer =
      //           parseFloat(dataStore[i - 1]) / parseFloat(dataStore[i + 1]);
      //         dataStore.splice(i - 1, 3);
      //       } else if (!answer === null) {
      //         answer +=
      //           parseFloat(dataStore[i - 1]) / parseFloat(dataStore[i + 1]);
      //         dataStore.splice(i - 1, 3);
      //       }
      //     } else if (dataStore[i] === "*") {
      //     }
      //     i--;
      //   }
      // }
    } else if (e.target.value == "clear") {
      buffer = "";
      let answer = null;
      dataStore = [];
      result = null;
    }
    console.log(buffer);
    console.log(dataStore);

    display.value = dataStore.join("");
    // displayValue += e.target.textContent;
    // display.value = displayValue;
    // dataStore.push(e.target.value);
    // console.log(dataStore);
  });
});

let arr = ["1", "+", "2", "-", "3", "*", "4", "/", "5", "/", "7"];

while (arr.indexOf("%") >= 0) {
  const index = arr.indexOf("%");
  const result = parseFloat(arr[index - 1]) / parseFloat(arr[index + 1]);
  arr.splice(index - 1, 3, result);
  console.log(arr);
  console.log(result);
}

while (arr.indexOf("/") >= 0) {
  const index = arr.indexOf("/");
  const result = parseFloat(arr[index - 1]) / parseFloat(arr[index + 1]);
  arr.splice(index - 1, 3, result);
  console.log(arr);
  console.log(result);
}

while (arr.indexOf("*") >= 0) {
  const index = arr.indexOf("*");
  const result = parseFloat(arr[index - 1]) * parseFloat(arr[index + 1]);
  arr.splice(index - 1, 3, result);
  console.log(arr);
  console.log(result);
}

while (arr.indexOf("+") >= 0) {
  const index = arr.indexOf("+");
  const result = parseFloat(arr[index - 1]) + parseFloat(arr[index + 1]);
  arr.splice(index - 1, 3, result);
  console.log(arr);
  console.log(result);
}

while (arr.indexOf("-") >= 0) {
  const index = arr.indexOf("-");
  const result = parseFloat(arr[index - 1]) - parseFloat(arr[index + 1]);
  arr.splice(index - 1, 3, result);
  console.log(arr);
  console.log(result);
}
// if(arr.findIndex){
// const index = arr.findIndex("/");
// let result = parseFloat(index - 1) / parseFloat(index + 1);
// arr.splice(index - 1, 3, result);
// console.log(arr);
// }
