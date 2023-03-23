// DISPLAY
const display = document.getElementById('display');

let currentDisplayValue = 0;
let decimal = false;
let decimalMultiplier = .1;
let operationEnded = false;
let negative = false;

function setDisplayValue(newValue){
    if(decimal)
        newValue = floorTo(newValue, decimalMultiplier);
    currentDisplayValue = newValue;
    display.textContent = newValue;
}

function resetDecimal(){
    decimal = false;
    decimalMultiplier = .1;
}

function addDigit(newDigit){
    if(operationEnded){
        resetDecimal();
        setDisplayValue(0);
        operationEnded = false;
    }
    if(decimal){
        setDisplayValue(currentDisplayValue + decimalMultiplier * newDigit);
        decimalMultiplier *= .1;
    }else {
        setDisplayValue(currentDisplayValue * 10 + newDigit * (negative ? -1 : 1));
        negative = false;
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

// KEYBOARD
const ceButton = document.getElementById('cancelEverything');
const cButton = document.getElementById('cancel');
const backspaceButton = document.getElementById('backspace');
const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const divButton = document.getElementById('div');
const timesButton = document.getElementById('times');
const equalButton = document.getElementById('equal');
const commaButton = document.getElementById('comma');
const digitButtons = [];

for (let index = 0; index < digits.length; index++) {
    const element = digits[index];
    const digit = Number(element.textContent);
    digitButtons[digit] = element;
}

document.addEventListener('keydown', function(event) {
    if(event.key >= '0' && event.key <= '9'){
        const digit = Number(event.key);
        addDigit(digit);
        pressedAnimation (digitButtons [digit]);  
    }
    else if(event.key === '.'){
        comma();
        pressedAnimation (commaButton);
    }
    else if(event.key === 'Enter'){
        equal();
        pressedAnimation (equalButton);
    }
    else if(event.key === 'Backspace'){
        backspace();
        pressedAnimation (backspaceButton); 
    }
    else if(event.key === 'Delete'){
        if(event.ctrlKey || event.shiftKey){
            cancelEverything();
            pressedAnimation (ceButton);
        }
        else {
            cancelNumber();
            pressedAnimation (cButton);
        } 
    }
    else if(event.key === '+'){
        addition();
        pressedAnimation (addButton);
    }
    else if(event.key === '-'){
        subtraction();
        pressedAnimation (subButton);
    }
    else if(event.key === '*'){
        multiplication();
        pressedAnimation (timesButton);
    }
    else if(event.key === '/'){
        division();
        pressedAnimation (divButton);
    }
});

function pressedAnimation (element) {
    element.classList.add('pressed');
        setTimeout(function(){
            element.classList.remove('pressed');
        }, 200);
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
    state.storedNumber = 0;
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

const state = {
    storedNumber: 0,
    operation: null
};

function squareRoot(){
    operation();
    state.operation = squareR;
}

function division(){
    operation();
    state.operation = div;
}

function multiplication(){
    operation();
    state.operation = times;
}

function subtraction(){
    if(state.operation === null && state.storedNumber === currentDisplayValue){
        negative = true;
    }
    else{
        operation();
        state.operation = sub;
    }
}

function comma(){
    decimal = true;
}

function equal(){
    state.operation?.();
}

function addition(){
    operation();
    state.operation = add;
}

function add(){
    setDisplayValue(state.storedNumber + currentDisplayValue);
    operationEnded = true;
    state.operation = null;
}

function sub(){
    setDisplayValue(state.storedNumber - currentDisplayValue);
    operationEnded = true;
    state.operation = null;
}

function times(){
    setDisplayValue(state.storedNumber * currentDisplayValue);
    operationEnded = true;
    state.operation = null;
}

function div(){
    setDisplayValue(state.storedNumber / currentDisplayValue);
    operationEnded = true;
    state.operation = null;
}

function squareR(){
    setDisplayValue(Math.sqrt(storedNumber));
    operationEnded = true;
    state.operation = null;
}

function operation(){
    equal();
    state.storedNumber = currentDisplayValue;
    operationEnded = true;
}

// UTILS
function floorTo(number, precision){
    const realPrecision = Math.round(1 / precision);
    return Math.floor(number * realPrecision + .1) / realPrecision;
}