const buttons = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");


const displayText = document.querySelector("#display");
const add = document.getElementById("add");
const subtract = document.getElementById("sub");
const multiply = document.getElementById("mul");
const divide = document.getElementById("div");
const evaluate = document.getElementById("calculate");
const turnOnOff = document.getElementById("turnonoff");

let leftOp = '', rightOp = '';

let operatorClicked = '', operator = '', result = '';

const removeActive = () => {
    operators.forEach((opr) => {
        opr.classList.remove("active");
    })
}


//OPERANDS PLACEMENT
buttons.forEach((btn) => {


    btn.addEventListener("click", (e) => {

        removeActive()

        if (displayText.value == 0 || result && !operatorClicked) {
            displayText.value = '';
        }


        displayText.value += e.target.value;

        if (!operatorClicked && !result)
            leftOp += e.target.value;

        else if (result) {
            leftOp = result;
            rightOp += e.target.value;
        }

        else
            rightOp += e.target.value;

        console.log("Button " + "L", leftOp, "R", rightOp);
    })

})

//OPERATOR WITH CONDITIONS TO ADD THE LAST CLICKED OPERATOR
operators.forEach((operator) => {

    operator.addEventListener("click", (j) => {

        if (leftOp) {

            removeActive();
            j.currentTarget.classList.add("active");

            let displayValue = displayText.value;

            if (j.target.value == '%') {
                displayText.value = parseFloat(displayValue) / 100;
                return;
            }

            if (j.target.value == 'invert') {
                displayText.value = parseFloat(displayValue) * -1;
                return;
            }
            
            const lastDigit = displayValue.charAt(displayValue.length - 1);

            console.log(displayValue);

            //CHECK TO USE THE LAST CLICKED OPERATOR
            if (['+', '-', '*', '/'].includes(lastDigit))
                displayValue = displayValue.replace(lastDigit, '');

            displayText.value = displayValue + j.target.value;
            operatorClicked = 'clicked';

            console.log(displayText.value);
        }
    })
})

//EVALUATE THE EXPRESSION
evaluate.addEventListener("click", function () {
    console.log("L " + leftOp, "R " + rightOp);

    console.log(displayText.value);
    result = eval(String(displayText.value));

    console.log(result);

    if (leftOp && rightOp) {
        displayText.value = result;
        rightOp = '';
    }
    else {

        displayText.value = 0;
    }

    operatorClicked = '';
})

//RESET
turnOnOff.addEventListener("click", function () {
    displayText.value = 0;
    operatorClicked = '', leftOp = '', rightOp = '';
    result = '';
    removeActive();
})

//TURN OFF CALCULATOR
turnOnOff.addEventListener("dblclick", function () {
    displayText.value = '';
})








