const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelector("#buttons-container button");

class Calcuator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.previousOperationText = currentOperationText
        this.currentOperation = ""

    }
    //add digit to calculator screen

    addDigit(digit){
     

        this.currentOperation = digit
        this.updateScreen()
    }

    //chang values of the calculator screen
    updateScreen(){
        this.currentOperationText.innerText += this.currentOperation;
    }
}
const calc = new Calcuator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            console.log("op: " + value)
        }
    });
});