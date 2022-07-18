class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // sets default state to an empty string 
        this.clear();
    }

    // clear function to earase all data and set output fields to an empty string
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // delete function to delete the last number clicked
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // appends the number to the currentOperand field
    appendNumber(number){
        // if there is already a period in the current operand field do not add another one
        if (number === '.' && this.currentOperand.includes('.')) return;
        // changes numbers to a string and appends the next number clicked 
        // allowing for multiple digit numbers
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }


    chooseOperation(operation){
        if (this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        // moves current number to previous operand field when an operation button
        // is clicked and set the current oeprand field to an empty string
        this.previousOperand =this.currentOperand;
        this.currentOperand = '';
    }

    // computes the number operations
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return

        }
        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intergerDisplay
        if(isNaN(intergerDigits)){
            intergerDisplay = ''
        }
        else{
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }
        else{
            return intergerDisplay;
        }
    }

    // updates the output display and formats the text
    updateDisplay(){
        this.currentOperandTextElement.innerText =this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText =this.previousOperand;
        // displays operation being performed
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// selects buttons with corresponding names 
const numberButtons= document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


// creates new Claculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// each time a number button is clicked add an onClick event listener that will append the number to 
// the output field and update the display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// event listener for each operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// equals button event listener
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// reset button event listener
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// delete event listener
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});