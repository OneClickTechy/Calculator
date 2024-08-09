// display
const output = document.getElementById("output");
let numberInputs = document.querySelectorAll(".number");
let operatorInputs = document.querySelectorAll(".operator");
let decimal = document.querySelector(".deci");

console.log(operatorInputs);
let displayValue = '';
//add event listener for numbers
numberInputs.forEach((i) => {
  i.addEventListener("click", (e) => {
    console.log(e.target.value)
    displayValue += e.target.value;
  });
  output.innerText = displayValue;
});

operatorInputs.forEach((i) => {
  i.addEventListener("click", (e) => {
    console.log(e.target.value);
  });
});
decimal.addEventListener("click", ()=>{
    console.log(decimal.value);
});
