//----------------------------------- Variables --------------------------------------------//

let memoryGlobalNumber = 0,
    memoryNewNumber = false,
    memoryOperation = '',
    error = 'ERROR';

const display = document.querySelector('.display');

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
        }
    }  
}

const pressedOperation = (op) => {
    let memoryLocalNumber = parseFloat(display.value);
    if (memoryNewNumber && memoryOperation !== '=') {
        display.value = memoryGlobalNumber;
    } else {
        memoryNewNumber = true;
        if (memoryOperation === '+') {
            memoryGlobalNumber += memoryLocalNumber;
        } else if (memoryOperation === '-') {
            memoryGlobalNumber -= memoryLocalNumber;
        } else if (memoryOperation === 'x') {
            memoryGlobalNumber *= memoryLocalNumber;
        } else if (memoryOperation === '/') {
            
            if(memoryLocalNumber === 0) {
                display.value = error; // error don t work
            } 
            memoryGlobalNumber /= memoryLocalNumber;
        } else {
            memoryGlobalNumber = memoryLocalNumber;
        }
    }
    display.value = memoryGlobalNumber;
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
            memoryLocalDecimal += '.';
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