// DISPLAY
const display = document.getElementById('display');

let storedValue = 0;
let currentDisplayValue = 0;
let decimal = false;
let decimalMultiplier = .1;

function setDisplayValue(newValue){
    currentDisplayValue = newValue;
    display.textContent = newValue;
}

function addDigit(newDigit){
    if(decimal){
        setDisplayValue(currentDisplayValue + decimalMultiplier * newDigit);
        decimalMultiplier *= .1;
    }else {
        setDisplayValue(currentDisplayValue * 10 + newDigit);
    }
}

// DIGITS
const digits = document.getElementsByClassName('digit');
for (let index = 0; index < digits.length; index++) {
    const element = digits[index];
    element.addEventListener('click', () => listenForDigit(Number(element.textContent)))
}

function listenForDigit(number){
    addDigit(number);
}

// OPERATIONS
const operationMethods = {
    'CE': cancelEverything,
    'C': cancelNumber,
    '⇚': backspace,
    '√': squareRoot,
    '÷': division,
    '×': multiplication,
    '-': subtraction,
    ',': comma,
    '=': equal,
    '+': addition
}
const operations = document.getElementsByClassName('operation');
for (let index = 0; index < operations.length; index++) {
    const element = operations[index];
    const method = operationMethods[element.textContent];
    if(method)
        element.addEventListener('click', method)
}

function cancelEverything(){

}

function cancelNumber(){

}

function backspace(){
    if(decimal){

    }else {
        setDisplayValue(Math.floor(currentDisplayValue / 10));
    }
}

function squareRoot(){

}

function division(){

}

function multiplication(){

}

function subtraction(){

}

function comma(){
    decimal = true;
}

function equal(){

}

function addition(){

}