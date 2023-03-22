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

// KEYBOARD
const ceButton = document.getElementById('cancelEverything');
document.addEventListener('keydown', function(event) {
    if(event.key >= '0' && event.key <= '9'){
        addDigit(Number(event.key));
    }
    else if(event.key === '.'){
        comma();
    }
    else if(event.key === 'Enter'){
        equal();
    }
    else if(event.key === 'Backspace'){
        backspace();
    }
    else if(event.key === 'Delete'){
        if(event.ctrlKey || event.shiftKey){
            cancelEverything();
            ceButton.classList.add('pressed');
            setTimeout(function(){
                ceButton.classList.remove('pressed');
            }, 100);
        }
        else cancelNumber();
    }
    else if(event.key === '+'){
        addition();
    }
    else if(event.key === '-'){
        subtraction();
    }
    else if(event.key === '*'){
        multiplication();
    }
    else if(event.key === '/'){
        division();
    }
});

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

// TODO: struttura per mantenere i risultati
const state = {
    storedNumber: 0,
    operation: null
};

function squareRoot(){
    // TODO: radice quadrata
    operation();
    state.operation = squareR;
}

function division(){
    // TODO: divisione
    operation();
    state.operation = div;
}

function multiplication(){
    // TODO: moltiplicazione
    operation();
    state.operation = times;
}

function subtraction(){
    // TODO: sottrazione
    if(currentDisplayValue === 0){

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
    setDisplayValue(Math.sqrt(currentDisplayValue));
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