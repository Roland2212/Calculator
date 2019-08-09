//----------------------------------- Variables --------------------------------------------//

let memoryGlobalNumber = 0,
    memoryNewNumber = false,
    memoryOperation = '',
    errorInfinity = 'ERROR',
    digitFlag = false;

const display = document.querySelector('.display');
const clearAll = document.getElementById('clear');

//----------------------------------- Styles --------------------------------------------//

let smallFontStyle = '36px';
let normalFontStyle = '72px';

//----------------------------------- Functions --------------------------------------------//

const pressedNumber = (digit) => {
    if (memoryNewNumber) {
        memoryNewNumber = false;
        display.value = digit;
    } else {
        if (display.value === '0') {
            display.value = digit;
        } else {
           display.value += digit;
           digitFlag = true;
        }
    }
    if(display.value.length > 9) {
        display.style.fontSize = smallFontStyle;
    } else {
        display.style.fontSize = normalFontStyle;
    }
}

const pressedOperation = (op) => {
    let memoryLocalNumber = parseFloat(display.value);
    if (memoryNewNumber && memoryOperation !== '=') {
        display.value = memoryGlobalNumber;
        if(display.value.length > 9) {
            display.style.fontSize = smallFontStyle;
        } else {
            display.style.fontSize = normalFontStyle;
        }
    } else {
        memoryNewNumber = true;
        clearAll.textContent = 'C';
        if (memoryOperation === '+') {
            memoryGlobalNumber += memoryLocalNumber;
        } else if (memoryOperation === '-') {
            memoryGlobalNumber -= memoryLocalNumber;
        } else if (memoryOperation === 'x') {
            memoryGlobalNumber *= memoryLocalNumber;
        } else if (memoryOperation === '/') {
            memoryGlobalNumber /= memoryLocalNumber;
        } else {
            memoryGlobalNumber = memoryLocalNumber;
        }
    }
    if (memoryGlobalNumber === Infinity) {
        display.value = errorInfinity;
    } else {
        if (isNaN(memoryGlobalNumber)) {
            memoryGlobalNumber = 0;
        } 
        if (isNaN(memoryLocalNumber)) {
            memoryLocalNumber = 0;
        }
        if(memoryGlobalNumber === Math.floor(memoryGlobalNumber)) {
            display.value = memoryGlobalNumber;
            if(display.value.length > 9) {
                display.style.fontSize = smallFontStyle;
            } else {
                display.style.fontSize = normalFontStyle;
            }
        } else {
            if (memoryGlobalNumber < 0.001) {
                display.value = memoryGlobalNumber.toFixed(14);
            } else {
                display.value = memoryGlobalNumber.toFixed(3);
            }
            if(display.value.length > 9) {
                display.style.fontSize = smallFontStyle;
            } else {
                display.style.fontSize = normalFontStyle;
            }
        }
    }
    memoryOperation = op;
    console.log('global ' + memoryGlobalNumber);
    console.log('local ' + memoryLocalNumber);
}

const decimalPressed = () => {
    let memoryLocalDecimal = display.value;

    if (memoryNewNumber) {
        memoryLocalDecimal = '0.';
        memoryNewNumber = false;
    } else {
        if(memoryLocalDecimal.indexOf('.') === -1) {
            if(!digitFlag) {
                memoryLocalDecimal += '0.';
            } else {
                memoryLocalDecimal += '.';
            }
        }   
    }
    display.value = memoryLocalDecimal;
}

const percentPressed = () => {
    let memoryLocalPercent = display.value / 100;
    memoryGlobalNumber = memoryLocalPercent;
    display.value = memoryGlobalNumber;
}

const plusMinusChange = () => {
    let memoryLocalPlusMinus = display.value * -1;
    memoryGlobalNumber = memoryLocalPlusMinus;
    display.value = memoryGlobalNumber;
}

const clearPressed = () => {
    if(memoryNewNumber) {
        display.value = '0';
        memoryGlobalNumber = 0;
        memoryOperation = '';
        clearAll.textContent = 'AC';
    } else {
        if(memoryGlobalNumber === 0) {
            clearAll.textContent = 'AC';
            display.value = '0';
        } else {
            display.value = '0';
        }
    }
}

//----------------------------------- Events --------------------------------------------//

const digits = document
    .querySelectorAll('button.digit')
    .forEach(digit => digit.addEventListener('click', (e) => {
        pressedNumber(e.target.textContent);
    }));

const operations = document
    .querySelectorAll('button.op')
    .forEach(op => op.addEventListener('click', (e) => {
        pressedOperation(e.target.textContent);
    }));

const decimal = document 
    .querySelector('.decimal')
    .addEventListener('click', decimalPressed);

const percent = document
    .querySelector('.percent')
    .addEventListener('click', percentPressed);

const plusMinus = document
    .querySelector('.plus-minus')
    .addEventListener('click', plusMinusChange);

const clear = document
    .querySelector('.clear')
    .addEventListener('click', clearPressed);