const displayBox = document.querySelector(".display"),
displayInput = document.querySelector(".display-input"),
displayResult = document.querySelector(".display-result"),
buttons = document.querySelectorAll("button"),
operators = ["%", "÷", "x", "-", "+"];
let input = "",
    result = "",
    lastCalculation = false,
    lastInput = "";

const calculete = btnValue => {
    const lastChar = input.slice(-1),
    secondToLastChar = input.slice(-2, -1),
        withoutLastChar = input.slice(0, -1),
      isLastCharOperator = operators.includes(lastChar),
      isInvalidResult = ["Error", "Infinity"].includes(result);
      

    if (btnValue === "=") {
        if ( 
            input === "" ||
            lastChar === "."  ||
            lastChar === "(" ||
            isLastCharOperator && lastChar !=="%" ||
            lastCalculation

        ) return;

        lastInput = input;

        const formattedInput = calculatePercentage (replaceOperators(input));
        try {
            const calculeteValue = eval(formattedInput);
            result = parseFloat(calculeteValue.toFixed(10)).toString();
        }
        catch {
        result = "Error";
    }

     lastCalculation = true;
     displayBox.classList.add("active");
    } 


    else if (btnValue === "AC") {
        resetCalculator("");
    } 

    else if (btnValue === "") {
       if (lastCalculation) {
        if (isInvalidResult) {
            resetCalculator("");
       
       }
        else {
            input = lastInput.slice(0, -1);
            result = "";
            lastCalculation = false;
        }
    } 
    else {
    input = withoutLastChar;
    }
}

    else if (operators.includes(btnValue)) {
        if (lastCalculation) {
            if (isInvalidResult) return;
            resetCalculator(result + btnValue);
        }

        else if (
            (input === "" || lastChar === "(") && btnValue !== "-" ||
            input === "-" ||
            lastChar === "." ||
            secondToLastChar === "(" && lastChar === "-" ||
            (secondToLastChar === "%" || lastChar === "%") && btnValue === "%"

        ) return;


       else if (lastChar === "%") 
        input += btnValue;
       else if (isLastCharOperator) 
        input = withoutLastChar + btnValue;

       else 
        input += btnValue;
    }

    else if (btnValue === ".") {
        const decimalValue = "0.";

        if (lastCalculation) 
            resetCalculator(decimalValue);

        else if (lastChar === ")" || lastChar === "%") 
            input += "x" + decimalValue;

        else if  (input === "" || isLastCharOperator || lastChar === "(") 
            input += decimalValue;

        
        else {
        let lastOperatiorIndex = -1;

        for (const operator of operators) {
            const index = input.lastIndexOf(operator);

            if (index > lastOperatiorIndex) 
                lastOperatiorIndex = index;
        }
        
        if (!input.slice(lastOperatiorIndex + 1).includes("."))
        input += btnValue;
       }
    }

       else if (btnValue === "( )") {
        const {openBrecketsCount, closeBrecketsCount } = countBrackets(input);
          
           if (lastCalculation) {
                if (isInvalidResult) 
                resetCalculator ("(")
            else 
            resetCalculator(result + "x(");
        }

        else if (input === "" || isLastCharOperator && lastChar !== "%") {
            input += "(";
        }
       
       else if ( 
        openBrecketsCount > closeBrecketsCount && 
        lastChar !== "(" &&
        !isLastCharOperator
       ) {
         input += ")"
       } 

       else if (lastChar === "(") {
        return; 
       }

       else {
        input += "x("
       }
}
   
       else {
        if (lastCalculation) 
            resetCalculator(btnValue);
         else 
            input += btnValue; 
        }

    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;

    }
const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("x", "*");

const calculatePercentage = input => {

    input = input.replace(
        /(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g,
        "($1/100)*$2"
    );

    input = input.replace(
        /(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)%/g,
        "$1*($2/100)"
    );

    input = input.replace(
        /(\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)%/g,
        (_, firstNumber, operator, percentage) => {

            if (operator === "+")
                return `${firstNumber}+(${firstNumber}*${percentage}/100)`;

            if (operator === "-")
                return `${firstNumber}-(${firstNumber}*${percentage}/100)`;
        }
    );

    return input.replace(
        /(\d+(?:\.\d+)?)%/g,
        "($1/100)"
    );
};

const resetCalculator = newInput => {
    input = newInput;
    result = "";
    lastCalculation = false;
    displayBox.classList.add("active");
};

const countBrackets = input => {
    let openBrecketsCount = 0;
    let closeBrecketsCount = 0;

    for (const char of input) {
        if (char === "(") openBrecketsCount++;
        else if (char === ")") closeBrecketsCount++;
    }

    return {
        openBrecketsCount, 
        closeBrecketsCount
    };
};

buttons.forEach(button => {
    button.addEventListener("click", e => {
        calculete(e.target.textContent);
    })
});




/* testes: 
2 + 2 = 4 OK
10 x 5 = 50 OK
100 ÷ 4 = 25 OK
50%200 = 100 OK
200 x 50% = 100 ok
850 - 60% = 340 ok
850 + 60% = 1360 ok 
850 ÷ 10% = 8500 ok 
0.5 + 0.25 = 0.75 ok 
(10 + 5) x 2 = 30 ok 
10 ÷ (2 + 3) = 2 ok

OBS; BOTAO DE APAGAR!!! 
esta apagando o resultado 
calculadora do celular volta
na operação e apaga
deu boa o botão de apagar 
função () arrumada!!! hehehehehe

*/