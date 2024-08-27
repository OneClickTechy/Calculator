const display = document.querySelector('.calc-display');//display
const keys = document.querySelector('.calc-buttons');//calculator keys 

let expression = [];
let buffer = '';
let parenthesesBug = 0;


//add event listener to calc keys
keys.addEventListener('click', (e) => {
   
    const { target } = e;
    const { value } = target;

    if (/\d/.test(value)) {//if enter number
        buffer += value;
        console.log(buffer);

    } else if (value === '.') {//if enter dot
        if (!buffer.includes(value) && /\d/.test(buffer[buffer.length - 1])) {
            console.log(true);
            buffer += value;
            console.log(buffer);

        } else if (buffer === '') {
            buffer += `0${value}`;
            console.log(buffer);
        } else { console.log(false) }
        console.log(value);
    } else if (target.classList.contains('operator')) {//if enter operator
        console.log('operator' + value);
        if (buffer !== '' || /^-?\d+(\.\d)?$/.test(expression[expression.length - 1])) {
            console.log('buffer pushed');
            expression.push(buffer);
            console.log(expression);
            buffer = '';
            console.log(`${buffer} is empty`);
            expression.push(value);
            console.log(expression)
        } else if (buffer === '' && expression[expression.length - 1] === ')') {
            expression.push(value);
        }

    } else if (target.classList.contains('operator-percentage')) {//if enter %
        console.log(value);
        if (buffer !== '') {
            expression.push(String(parseFloat(buffer) / 100));
            buffer = '';
            console.log(expression);
        }
    } else if (value === '()') {//if enter target is ()
        console.log('()');
        if (buffer !== '') {
            expression.push(buffer);
            buffer = '';
            console.log('buffer is not empty so pushed', expression);
        }
        if (parenthesesBug === 0 & expression.length === 0) {//from begin () is clicked
            expression.push('(');
            console.log(expression);
            parenthesesBug++;
        } else if (expression[expression.length - 1] === '/' ||
            expression[expression.length - 1] === '*' ||
            expression[expression.length - 1] === '+' ||
            expression[expression.length - 1] === '-'
        ) {
            expression.push('(');
            parenthesesBug++;
        } else if (/^-?\d+(\.\d)?$/.test(expression[expression.length - 1])) {//if click after number
            if (parenthesesBug > 0) {
                expression.push(')');
                parenthesesBug--;
                console.log(expression);
            } else if (parenthesesBug === 0) {
                expression.push('*', '(');
                parenthesesBug++;
                console.log(expression);
            }
        } else if (expression[expression.length - 1] === '(') {
            expression.push('(');
            parenthesesBug++;
        } else if (expression[expression.length - 1] === ')') {
            if (parenthesesBug > 0) {
                expression.push(')');
                parenthesesBug--;
            } else if (parenthesesBug === 0) {
                expression.push('*', '(');
                parenthesesBug++;
            }

        }

    } else if (value === '+|-') {//if value is plus or minus
        if (buffer.includes('-')) {
            console.log(`${buffer} have -`);
            buffer = buffer.slice(1);
            console.log(buffer);
        } else {
            console.log('no -');
            buffer = '-' + buffer;
            console.log(buffer);
        }
        console.log('sign ', value);
    } else if (value === '=') {//if calculate is trigger
        console.log('calculate begin');
        if (buffer !== '') {
            expression.push(buffer);
            buffer = '';
            console.log(expression);
        }
        if(parenthesesBugCheck(expression)){
            console.log('parenthesis are equal\n', expression);
            display.innerText = '';
            display.innerText = calculator(splicer(expression));
        }else{
            display.innerText = 'error';
        }
    } else if (value === 'C') {//if value is clear
        console.log('clear');
        buffer = '';
        expression = [];
        parenthesesBug = 0;
        display.innerText = null;
    }else if(value === '⌫')
    console.log('buffer :', buffer);
    console.log('exp : ', expression);
    console.log('parC', parenthesesBug);

display.innerText = expression.join('') + ' ' + buffer;
})
const array = ['(', ')', '('];

//parenthesis balance checker function
function parenthesesBugCheck(array) {
    let opc = 0;
    let cpc = 0;

    array.map((i) => {
        if(i === '('){
            opc++;
        }else if(i === ')'){
            cpc++;
        }
    })
    return (opc === cpc) ? true : false;

}

//calculator function


//splicer function uses: split the array from ( to ) and calculate inner values and return single value
function splicer(array){
    while(array.includes('(')){
    if(!array.includes('(')) {
     console.log('no ()');   
    }
    let obi = array.lastIndexOf('(');
    let cbi;
    for(let i = obi + 1; obi < array.length - 1; i++){
        if(array[i] === ')'){
            cbi = i;
            break;
        }
    }
    let tempArr = array.slice(obi+1, cbi);
    let result = calculator(tempArr);
    console.log(result);
    console.log(obi, cbi);
    const count = cbi - obi + 1;
    array.splice(obi, count, String(result));
}
    return array;
}

function calculator(array) {
    let ans;

    // division and multiplication 
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '/') {
            ans = parseFloat(array[i - 1]) / parseFloat(array[i + 1]);
            array.splice(i - 1, 3, ans);
            i--; // Adjust index after splicing
        } else if (array[i] === '*') {
            ans = parseFloat(array[i - 1]) * parseFloat(array[i + 1]);
            array.splice(i - 1, 3, ans);
            i--; // Adjust index after splicing
        }
    }

    // addition and subtraction
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '+') {
            ans = parseFloat(array[i - 1]) + parseFloat(array[i + 1]);
            array.splice(i - 1, 3, ans);
            i--; // Adjust index after splicing
        } else if (array[i] === '-') {
            ans = parseFloat(array[i - 1]) - parseFloat(array[i + 1]);
            array.splice(i - 1, 3, ans);
            i--; // Adjust index after splicing
        }
    }

    // The final result should be the only element left in the array
    return array[0];
}

//test cases from chatgpt to check my logic is correct or not
// Test cases array
const testCases = [
    { expression: ['2', '+', '3'], expected: 5 },               // Simple addition
    { expression: ['10', '-', '5'], expected: 5 },              // Simple subtraction
    { expression: ['4', '*', '5'], expected: 20 },              // Simple multiplication
    { expression: ['20', '/', '4'], expected: 5 },              // Simple division
    { expression: ['2', '+', '3', '*', '4'], expected: 14 },    // BODMAS rule
    { expression: ['(', '2', '+', '3', ')', '*', '4'], expected: 20 }, // Parentheses with multiplication
    { expression: ['10', '+', '2', '*', '6', '/', '3'], expected: 14 }, // Complex expression
    { expression: ['10', '/', '2', '*', '(', '3', '+', '2', ')'], expected: 25 }, // Mixed operations
    { expression: ['(', '10', '+', '2', ')', '*', '(', '3', '+', '4', ')'], expected: 84 }, // Nested parentheses
    { expression: ['100', '-', '(', '50', '/', '2', ')'], expected: 75 } // Subtraction with division
];

// Function to test the calculator
function testCalculator() {
    testCases.forEach((test, index) => {
        const result = calculator(splicer(test.expression));
        const passed = result === test.expected;

        console.log(`Test Case ${index + 1}: ${test.expression.join(' ')} = ${result}`);
        console.log(passed ? 'Passed' : `Failed (Expected: ${test.expected})`);
        console.log('-----------------------------------------');
    });
}

// Run the test
testCalculator();
