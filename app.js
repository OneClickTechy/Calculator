let buttons = document.querySelectorAll(".for-calc");
const _delete = document.querySelector("#delete");
const deleteIcon = document.getElementById("#delete-icon");
let displayValue = "";
let display = document.getElementById("output");
let dataStore = [];
let buffer = "";
const operators = /[\*\/\+%-]/;
const percent = /[%]/;
const numbers = /[\d.]/;
const plusOrMinus = /\(-/;
let openParenthesesCount = 0;
const calc = /[=]/;
let answer = null;

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    //check if input is equal to ( or )
    if (e.target.value === "()") {
      console.log("paranthesis clicked");
      //if buffer have any data ! need to push in dataStore array
      if (buffer !== "") {
        console.log("in buffer push step");
        dataStore.push(buffer);
        buffer = "";
        console.log("buffer pushed and the array is", dataStore);
      }else{
        console.log('buffer is empty');
    }
      // check if there is no entry
      if (buffer === "" && dataStore.length === 0) {
        console.log("no entry found so  (");
        dataStore.push("(");
        openParenthesesCount++;
        console.log('opc', openParenthesesCount);
      } //check if before value is a operend
      else if (numbers.test(dataStore[dataStore.length - 1])) {
        console.log("before element is operend");
        if (openParenthesesCount > 0) {
          console.log("already have ( so )");
          dataStore.push(")");
        openParenthesesCount--;
        console.log('opc', openParenthesesCount);
          console.log("after push ", dataStore);
        } else if (openParenthesesCount === 0) {
          dataStore.push("*");
          dataStore.push("(");
          openParenthesesCount++;
        console.log('opc', openParenthesesCount);
          console.log("don' have ( so (");
          console.log("after", dataStore);
        }
      } //check if before value is operator
      else if(operators.test(dataStore[dataStore.length -1])){
        console.log("before element is operator so (");
        dataStore.push('(');
        openParenthesesCount++;
        console.log('opc', openParenthesesCount);
      }//check if before value is )
      else if(dataStore[dataStore.length -1] === ')'){
        console.log('before value is ) so')
        if(openParenthesesCount > 0){
          dataStore.push(')');
        openParenthesesCount--;
        console.log('opc', openParenthesesCount);

        }else if(openParenthesesCount === 0){
          console.log('opc', openParenthesesCount);
          dataStore.push('*');
          dataStore.push('(');
        openParenthesesCount++;
        console.log('opc', openParenthesesCount);

        }
      }//check if before value is (
      else if(dataStore[dataStore.length -1] === '('){
        dataStore.push('(');
        openParenthesesCount++;
      }
      else{
        console.log('condition failed');  
      }
    }

    //checke if input is equal to an % operator
    else if (percent.test(e.target.value)) {
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
      //if before value is ( and input is +/-
      
      if (buffer != "" && !operators.test(buffer)) {
        dataStore.push(buffer);
        buffer = "";
        dataStore.push(e.target.value);
      } else if (dataStore[dataStore.length - 1] === ")") {
        dataStore.push(e.target.value);
      }
      //check if input is equal to a number
    } else if (numbers.test(e.target.value)) {
      if (dataStore[dataStore.length - 1] === ")") {
        dataStore.push("*");
      }
      console.log(e.target.value);
      buffer += e.target.value;

      //calc
    } else if (calc.test(e.target.value)) {
      console.log("datastore :", dataStore);
      console.log("datastore length : ", dataStore.length, "buffer : ", buffer);
      if (dataStore.length >= 2) {
        if (
          operators.test(dataStore[dataStore.length - 1]) &&
          dataStore.length >= 2 &&
          buffer === ""
        ) {
          dataStore.pop();
          console.log(`poped : ${dataStore}`, typeof dataStore);
          console.log(buffer);
        } else if (buffer !== "") {
          dataStore.push(buffer);
          buffer = "";
          console.log(`without poped : ${dataStore}`, typeof dataStore);
          console.log(buffer);
        }

        console.log("calc func");

        while (dataStore.lastIndexOf("(") >= 0) {
          let initIndex = dataStore.lastIndexOf("(");
          let finIndex = null;
          for (let i = initIndex + 1; i < dataStore.length; i++) {
            if (dataStore[i] === ")") {
              finIndex = i;
              break;
            }
          }
          let betweenCount = finIndex - initIndex - 1;
          console.log(initIndex, finIndex, betweenCount);
          let nestedArray = [];

          for (let i = initIndex + 1; i < finIndex; i++) {
            nestedArray.push(dataStore[i]);
          }
          console.log(nestedArray);
          while (nestedArray.indexOf("%") >= 0) {
            const index = nestedArray.indexOf("%");
            const result =
              parseFloat(nestedArray[index - 1]) /
              parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          while (nestedArray.indexOf("/") >= 0) {
            const index = nestedArray.indexOf("/");
            const result =
              parseFloat(nestedArray[index - 1]) /
              parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          while (nestedArray.indexOf("*") >= 0) {
            const index = nestedArray.indexOf("*");
            const result =
              parseFloat(nestedArray[index - 1]) *
              parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          while (nestedArray.indexOf("+") >= 0) {
            const index = nestedArray.indexOf("+");
            const result =
              parseFloat(nestedArray[index - 1]) +
              parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          while (nestedArray.indexOf("-") >= 0) {
            const index = nestedArray.indexOf("-");
            const result =
              parseFloat(nestedArray[index - 1]) -
              parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          console.log(nestedArray);
          dataStore.splice(initIndex, betweenCount + 2, ...nestedArray);
          console.log(dataStore);
        }
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
      } else {
        console.log("calc func did not run - condition failed");
      }
    } else if (e.target.value == "clear") {
      buffer = "";
      let answer = null;
      dataStore = [];
      display.value = "";
      result = null;
    }

    // Update the display to show current buffer and stored operations
    display.value = dataStore.join(" ") + " " + buffer;
    //test 
    console.log(dataStore);
  });
});

// //test

// arr = ['105', '+', '(', '10', '*', '(', '5', '+', '4', '-', '3', '/', '2', ')', '/', '3', ')', '+', '17', '%', '35'];

// while(arr.lastIndexOf('(') >= 0){
// let initIndex = arr.lastIndexOf('(');
// let finIndex = null;
// for(let i = initIndex+1; i < arr.length; i++){
//   if(arr[i]===')'){
//     finIndex = i;
//     break;
//   }
// }
// let betweenCount = finIndex - initIndex -1;
// console.log(initIndex, finIndex, betweenCount);
// let nestedArray = [];

// for(let i=initIndex+1; i < finIndex; i++){
//   nestedArray.push(arr[i]);
// }
// console.log(nestedArray);
// while (nestedArray.indexOf("%") >= 0) {
//             const index = nestedArray.indexOf("%");
//             const result =
//               parseFloat(nestedArray[index - 1]) / parseFloat(nestedArray[index + 1]);
//             nestedArray.splice(index - 1, 3, result);
//             console.log(nestedArray);
//             console.log(result);
//           }

//           while (nestedArray.indexOf("/") >= 0) {
//             const index = nestedArray.indexOf("/");
//             const result =
//               parseFloat(nestedArray[index - 1]) / parseFloat(nestedArray[index + 1]);
//             nestedArray.splice(index - 1, 3, result);
//             console.log(nestedArray);
//             console.log(result);
//           }

//           while (nestedArray.indexOf("*") >= 0) {
//             const index = nestedArray.indexOf("*");
//             const result =
//               parseFloat(nestedArray[index - 1]) * parseFloat(nestedArray[index + 1]);
//             nestedArray.splice(index - 1, 3, result);
//             console.log(nestedArray);
//             console.log(result);
//           }

//           while (nestedArray.indexOf("+") >= 0) {
//             const index = nestedArray.indexOf("+");
//             const result =
//               parseFloat(nestedArray[index - 1]) + parseFloat(nestedArray[index + 1]);
//             nestedArray.splice(index - 1, 3, result);
//             console.log(nestedArray);
//             console.log(result);
//           }

//           while (nestedArray.indexOf("-") >= 0) {
//             const index = nestedArray.indexOf("-");
//             const result =
//               parseFloat(nestedArray[index - 1]) - parseFloat(nestedArray[index + 1]);
//             nestedArray.splice(index - 1, 3, result);
//             console.log(nestedArray);
//             console.log(result);
//           }

//           console.log(nestedArray);
//           arr.splice(initIndex, betweenCount+2, ...nestedArray);
//           console.log(arr);
// }
// // while(arr.length===)
// while (arr.indexOf("%") >= 0) {
//   const index = arr.indexOf("%");
//   const result =
//     parseFloat(arr[index - 1]) / parseFloat(arr[index + 1]);
//   arr.splice(index - 1, 3, result);
//   console.log(arr);
//   console.log(result);
// }

// while (arr.indexOf("/") >= 0) {
//   const index = arr.indexOf("/");
//   const result =
//     parseFloat(arr[index - 1]) / parseFloat(arr[index + 1]);
//   arr.splice(index - 1, 3, result);
//   console.log(arr);
//   console.log(result);
// }

// while (arr.indexOf("*") >= 0) {
//   const index = arr.indexOf("*");
//   const result =
//     parseFloat(arr[index - 1]) * parseFloat(arr[index + 1]);
//   arr.splice(index - 1, 3, result);
//   console.log(arr);
//   console.log(result);
// }

// while (arr.indexOf("+") >= 0) {
//   const index = arr.indexOf("+");
//   const result =
//     parseFloat(arr[index - 1]) + parseFloat(arr[index + 1]);
//   arr.splice(index - 1, 3, result);
//   console.log(arr);
//   console.log(result);
// }

// while (arr.indexOf("-") >= 0) {
//   const index = arr.indexOf("-");
//   const result =
//     parseFloat(arr[index - 1]) - parseFloat(arr[index + 1]);
//   arr.splice(index - 1, 3, result);
//   console.log(arr);
//   console.log(result);
// }

// console.log(arr);
// console.log(arr);

//parenthesis test cases
// console.log("inside bracket");
// if (buffer === "" && dataStore.length === 0) {
//   console.log("first");
//   dataStore.push("(");
//   openParenthesesCount++;
//   console.log(dataStore, openParenthesesCount);
// } else if (dataStore[dataStore.length - 1] === "(") {
//   if (buffer !== "") {
//     dataStore.push(buffer);
//     buffer = "";
//     dataStore.push(")");
//     openParenthesesCount--;
//   }else{
//     dataStore.push('(');
//     openParenthesesCount++;
//   }
// } else if (openParenthesesCount > 0) {
//   if(operators.test(dataStore[dataStore.length -1]) && buffer == ''){
//     dataStore.push('(');
//     openParenthesesCount++;
//     return;
//   }
//   if(buffer !== ''){
//     dataStore.push(buffer);
//     buffer = '';
//   }
//   dataStore.push(")");
//   openParenthesesCount--;
// } else if (numbers.test(buffer)) {
//   dataStore.push(buffer);
//   buffer = "";
//   dataStore.push("*");
//   dataStore.push("(");
//   openParenthesesCount++;
// } else if (operators.test(dataStore[dataStore.length - 1]))  {
//   dataStore.push("(");
//   openParenthesesCount++;
// }
