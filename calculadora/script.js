const displayBox = document.querySelector(".display"),
displayInput = document.querySelector(".display-input"),
displauResult = document.querySelector(".display-result"),
buttons = document.querySelectorAll("button"),
operators = ["%", "÷", "×", "-", "+"];
let input = "",
    result = "",
    lastCalculation = false;

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

        const formattedInput = replaceOperators(input);
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
        if (isInvalidResult) resetCalculator("");
        resetCalculator(result.slice(0, -1));
       }
        else input = withoutLastChar;
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
       else if (lastChar === "%") input += btnValue;
       else if (isLastCharOperator) input = withoutLastChar + btnValue;
       else {
        let lastOperatiorIndex = -1;
        for (const operator of operators) {
            const index = input.lastIndexOf(operator);
            if (index > lastOperatiorIndex) lastOperatiorIndex = index;
        }
        if (!input.slice(lastOperatiorIndex + 1).includes("."))
        input += btnValue;
       }
    }

    else if (btnValue === ".") {
        const decimalValue = "0.";
        if (lastCalculation) resetCalculator(decimalValue);
        else if (lastChar === ")" || lastChar === "%") input += "×" + decimalValue;
        else if  (input === "" || isLastCharOperator || lastChar === "(") input += decimalValue;
        else input += btnValue;
    }



    else { 
      
          if (lastCalculation) resetCalculator(btnValue);
            else  
            input += btnValue;
        
    }

    displayInput.value = input;
    displauResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
}

const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("x", "*");

const resetCalculator = newInput => {
    input = newInput;
    result = "";
    lastCalculation = false;
    displayBox.classList.add("active");
};

buttons.forEach(button => {
    button.addEventListener("click", e => {
        calculete(e.target.textContent);
    })
});