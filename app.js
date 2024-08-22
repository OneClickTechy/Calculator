// let buttons = document.querySelectorAll(".for-calc");
// const _delete = document.querySelector('#delete');
// const deleteIcon = document.getElementById('#delete-icon');
// let displayValue = "";
// let display = document.getElementById("output");
// let dataStore = [];
// let buffer = "";
// const operators = /[\*\/\+%-]/;
// const percent = /[%]/;
// const numbers = /[\d.]/;
// const plusOrMinus = /[\+-]/;
// let openParenthesesCount = 0;
// const calc = /[=]/;
// let answer = null;

// buttons.forEach((element) => {
//   element.addEventListener("click", (e) => {
    
//     //checke if input is equal to an % operator
//     if(e.target.value === '()'){
//       console.log('inside bracket')
//       if(buffer === '' && dataStore.length === 0){
//         console.log('first')
//         dataStore.push('(');
//         openParenthesesCount++;
//         console.log(dataStore, openParenthesesCount);
//       }else if (dataStore[dataStore.length-1] === '('){
//         if(buffer !== ''){
//           dataStore.push(buffer);
//           buffer = '';
//           dataStore.push(')');
//           openParenthesesCount--;
//         }
//       }else if(numbers.test(buffer)){
//         dataStore.push(buffer);
//         buffer='';
//         dataStore.push('*');
//         dataStore.push('(');
//       }
//     }
//     else if (percent.test(e.target.value)) {
//       if (buffer != "") {
//         dataStore.push(buffer);
//         dataStore.push("/");
//         dataStore.push("100");
//         dataStore.push("*");
//         buffer = "";
//       }
//       //check if input is equal to an operator +-*/
//     } else if (operators.test(e.target.value)) {
//       console.log(e.target.value);
//       if (buffer != "") {
//         dataStore.push(buffer);
//         buffer = "";
//         dataStore.push(e.target.value);
//       } else if (buffer == "") {
//       }
//       //check if input is equal to a number
//     }else if (numbers.test(e.target.value)) {
//       console.log(e.target.value);
//       buffer += e.target.value;

//       //calc
//     } else if (calc.test(e.target.value)) {
//       console.log(e.target.value);
//       if (dataStore.length >= 2 && buffer !== "") {
//         dataStore.push(buffer);
//         buffer = "";

//         while (dataStore.indexOf("%") >= 0) {
//           const index = dataStore.indexOf("%");
//           const result =
//             parseFloat(dataStore[index - 1]) / parseFloat(dataStore[index + 1]);
//           dataStore.splice(index - 1, 3, result);
//           console.log(dataStore);
//           console.log(result);
//         }

//         while (dataStore.indexOf("/") >= 0) {
//           const index = dataStore.indexOf("/");
//           const result =
//             parseFloat(dataStore[index - 1]) / parseFloat(dataStore[index + 1]);
//           dataStore.splice(index - 1, 3, result);
//           console.log(dataStore);
//           console.log(result);
//         }

//         while (dataStore.indexOf("*") >= 0) {
//           const index = dataStore.indexOf("*");
//           const result =
//             parseFloat(dataStore[index - 1]) * parseFloat(dataStore[index + 1]);
//           dataStore.splice(index - 1, 3, result);
//           console.log(dataStore);
//           console.log(result);
//         }

//         while (dataStore.indexOf("+") >= 0) {
//           const index = dataStore.indexOf("+");
//           const result =
//             parseFloat(dataStore[index - 1]) + parseFloat(dataStore[index + 1]);
//           dataStore.splice(index - 1, 3, result);
//           console.log(dataStore);
//           console.log(result);
//         }

//         while (dataStore.indexOf("-") >= 0) {
//           const index = dataStore.indexOf("-");
//           const result =
//             parseFloat(dataStore[index - 1]) - parseFloat(dataStore[index + 1]);
//           dataStore.splice(index - 1, 3, result);
//           console.log(dataStore);
//           console.log(result);
//         }
//       }
//     } else if (e.target.value == "clear") {
//       buffer = "";
//       let answer = null;
//       dataStore = [];
//       display.value = "";
//       result = null;
//     }
//     console.log(buffer);
//     console.log(dataStore);

//    // Update the display to show current buffer and stored operations
// display.value = dataStore.join(" ") + " " + buffer;
//   });
// });

//test

arr = ['10', '*', '(', '5', '+', '4', '-', '3', '/', '2', ')', '/', '3'];

while(arr.lastIndexOf('(') >= 0){
let initIndex = arr.lastIndexOf('(');
let finIndex = null;
for(let i = initIndex+1; i < arr.length; i++){
  if(arr[i]===')'){
    finIndex = i;
    break;
  }
}
let betweenCount = finIndex - initIndex -1;
console.log(initIndex, finIndex, betweenCount);
let nestedArray = [];

for(let i=initIndex+1; i < finIndex; i++){
  nestedArray.push(arr[i]);
}
console.log(nestedArray);
while (nestedArray.indexOf("%") >= 0) {
            const index = nestedArray.indexOf("%");
            const result =
              parseFloat(nestedArray[index - 1]) / parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }
  
          while (nestedArray.indexOf("/") >= 0) {
            const index = nestedArray.indexOf("/");
            const result =
              parseFloat(nestedArray[index - 1]) / parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }
  
          while (nestedArray.indexOf("*") >= 0) {
            const index = nestedArray.indexOf("*");
            const result =
              parseFloat(nestedArray[index - 1]) * parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }
  
          while (nestedArray.indexOf("+") >= 0) {
            const index = nestedArray.indexOf("+");
            const result =
              parseFloat(nestedArray[index - 1]) + parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }
  
          while (nestedArray.indexOf("-") >= 0) {
            const index = nestedArray.indexOf("-");
            const result =
              parseFloat(nestedArray[index - 1]) - parseFloat(nestedArray[index + 1]);
            nestedArray.splice(index - 1, 3, result);
            console.log(nestedArray);
            console.log(result);
          }

          
          console.log(nestedArray);
break;
}