// DISPLAY
const display = document.getElementById('display');
console.log("hello world")

let storedValue = 0;
let currentDisplayValue = 0;
let decimal = false;
let decimalMultiplier = .1;
let overwrite = false;

function setDisplayValue(newValue){
    if(decimal)
        newValue = floorTo(newValue, decimalMultiplier);
    console.log(newValue);
    currentDisplayValue = newValue;
    display.textContent = newValue;
}

function resetDecimal(){
    decimal = false;
    decimalMultiplier = .1;
}

function addDigit(newDigit){
    if(overwrite){
        resetDecimal();
        setDisplayValue(0);
    }
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
    cancelNumber();
    storedValue = 0;
}

function cancelNumber(){
    setDisplayValue(0);
    resetDecimal();
}

function backspace(){
    if(decimal){
        decimalMultiplier *= 10;
        setDisplayValue((decimalMultiplier * 10) * Math.floor(currentDisplayValue / (decimalMultiplier * 10)));
        if(decimalMultiplier >= .1) resetDecimal();
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

// UTILS
console.log(floorTo(17.93, .1));
function floorTo(number, precision){
    const realPrecision = Math.round(1 / precision);
    return Math.floor(number * realPrecision + .1) / realPrecision;
}