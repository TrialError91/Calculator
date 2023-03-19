function add (a,b) {
    return (Math.round((a+b)*100)/100)
};

function subtract (a,b) {
    return (Math.round((a-b)*100)/100)
};

function multiply (a,b) {
    return (Math.round((a*b)*100)/100)
};

function divide (a,b) {
    if (b!==0) {
        return (Math.round((a/b)*100)/100)
    } else {
        return "ERROR"
    }
};

function power (a,b) {
    return (Math.round((a**b)*100)/100)
}

let operator

let result=null

const dot=document.querySelector('.dot')

function operate (operationSign,a,b) {
    if (operationSign==="+") {
        return add(a,b)
    } else if (operationSign==="-") {
        return subtract(a,b)
    } else if (operationSign==="*") {
        return multiply(a,b)
    } else if (operationSign==="/") {
        return divide(a,b)
    } else if (operationSign==="^") {
        return power(a,b)
    }
};

const numbers = document.querySelectorAll(".number")

const display = document.querySelector(".display")
numbers.forEach((button)=>{
    button.addEventListener('click', ()=> {
        if (result!==null) {
            display.textContent+=button.textContent
            smallDisplay.textContent+=button.textContent
        } else {
            display.textContent+=button.textContent
            smallDisplay.textContent+=button.textContent
        }
        operators.forEach((button)=>button.disabled=false)
        if (!display.textContent.includes('.')) {
            dot.disabled=false
        }
        if (result=="ERROR") {
            display.textContent=""
            smallDisplay.textContent=""
            display.textContent+=button.textContent
            smallDisplay.textContent+=button.textContent
        }
        if (equal.disabled==true) {
            display.textContent=""
            smallDisplay.textContent=""
            display.textContent+=button.textContent
            smallDisplay.textContent+=button.textContent
            equal.disabled=false
        }
    }, true)
});

const smallDisplay=document.querySelector(".smalldisplay")

const clear=document.querySelector(".clear")
clear.addEventListener('click', ()=>{
    display.textContent=""
    smallDisplay.textContent=""
    numberOne=null
    numberTwo=null
    result=null
    dot.disabled=false
});

const operators=document.querySelectorAll(".operator")
let numberOne=null
let numberTwo=null

function getOperator (button) {
    if (numberOne==null) {
        numberOne=+(display.textContent)
        display.textContent=""
        smallDisplay.textContent+=button.textContent
        operator=button.textContent
        button.disabled=true
    } else if (numberOne!==null) {
        numberTwo=+(display.textContent)
        display.textContent=""
        result=operate(operator,numberOne,numberTwo)
        smallDisplay.textContent=`${result}`
        smallDisplay.textContent+=button.textContent
        operator=button.textContent
        numberOne=result
        numberTwo=null
        button.disabled=true
    }
}

operators.forEach((button)=>{
    button.addEventListener('click', ()=>{
        button.disabled=false
        getOperator(button)
        dot.disabled=true
    })
});

const equal=document.querySelector('.equal')

equal.addEventListener('click', ()=>{
    if (numberOne!==null) {
        numberTwo=+(display.textContent)
        display.textContent=""
        result=operate(operator,numberOne,numberTwo)
        display.textContent+=`${result}`
        smallDisplay.textContent=`${result}`
        if (!display.textContent.includes('.')) {
            dot.disabled=false
        }
        if (result=="ERROR") {
            operators.forEach((button)=>button.disabled=true)
        }
        numberOne=null
        numberTwo=null
        equal.disabled=true
    }
    console.log(numberOne)
})

dot.addEventListener('click', ()=>{
    if (display.textContent!=="") {
        display.textContent+=dot.textContent
        smallDisplay.textContent+=dot.textContent
    }
    dot.disabled=true
})

const backspace=document.querySelector('.backspace')

backspace.addEventListener('click', ()=>{
    if ((result==null) || (result!==null & smallDisplay.textContent.includes(operator))) {
        smallDisplay.textContent=smallDisplay.textContent.slice(0,-1)
        display.textContent=display.textContent.slice(0,-1)
    }
    if (smallDisplay.textContent.charAt(-1)=="+" || smallDisplay.textContent.charAt(-1)=="-" || smallDisplay.textContent.charAt(-1)=="*" || 
    smallDisplay.textContent.charAt(-1)=="/" || smallDisplay.textContent.charAt(-1)=="^") {
        smallDisplay.textContent=smallDisplay.textContent.slice(0,-1)
        display.textContent=display.textContent.slice(0,-1)
    }
    if (smallDisplay.textContent.length==0) {
        numberOne=null
        operator=null
    }
    console.log(numberOne)
    console.log(numberTwo)
    console.log(result)
    console.log(operator)
})