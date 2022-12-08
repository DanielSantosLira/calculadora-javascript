const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.previousOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //adicionar dígito à tela da calculadora

    addDigit(digit) {
        //verifique se a operação atual já tem um ponto

        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    //processar todas as operações da calculadora

    processOperation(operation) {
        //verifique se a corrente está vazia
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //operação de alteração
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        //obter valor atual e anterior

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }


    }


    //alterar valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //verifique se o valor é zero, se for apenas adicione o valor atual
            if (previous === 0) {
                operationValue = current
            }
           //adicionar valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }
     //operação matemática chenge
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];
        if (mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.split(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.split(0, -1);
    }

    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualOperation() {
        const operation = previousOperationText.innerHTML.split(" ")[1];

        this.processOperation(operation);
    }
}
const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            console.log(value);
        }
    });
});