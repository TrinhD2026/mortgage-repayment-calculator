const amountSymbol = document.getElementById("amount-symbol");
const termSymbol = document.getElementById("term-symbol");
const interestSymbol = document.getElementById("interest-symbol");
const mortgageAmount = document.getElementById("mortgage-amount");
const mortgageTerm = document.getElementById("mortgage-term");
const mortgageInterest = document.getElementById("mortgage-interest");

const amountError = document.getElementById("amount-error");
const termError = document.getElementById("term-error");
const interestError = document.getElementById("interest-error");
const typeError = document.getElementById("type-error");

const repaymentType = document.getElementById("repayment-type");
const interestType = document.getElementById("interest-type");

const calculateBtn = document.getElementById("calculate-btn");

//output
const emptyResult = document.getElementById("empty-result");
const calculatedResult = document.getElementById("calculated-result");
const monthlyRepayment = document.getElementById("monthly-repayments");
const totalRepayment = document.getElementById("total-repayments");

function updateErrorClass(element, isError, errorClass) {
    if (element.classList.contains(errorClass)) {
        element.classList.remove(errorClass);
    }
    if (isError) {
        element.classList.add(errorClass);
    }
}

function handleRadioBtn(event) {
    let options = document.querySelectorAll(".type-label");
    options.forEach(queryElement => {
        if (queryElement.classList.contains("radio-selected")) {
            queryElement.classList.remove("radio-selected");
        }
    });
    event.target.parentElement.classList.add("radio-selected"); //hard-coded way to access the div container
}

function handleCalculateBtn() {
    updateErrorClass(amountSymbol, true, "error-symbol");
    updateErrorClass(mortgageAmount.parentElement, true, "error-input");
    amountError.style.display = "block";

    updateErrorClass(termSymbol, true, "error-symbol");
    updateErrorClass(mortgageTerm.parentElement, true, "error-input");
    termError.style.display = "block";

    updateErrorClass(interestSymbol, true, "error-symbol");
    updateErrorClass(mortgageInterest.parentElement, true, "error-input");
    interestError.style.display = "block";
    typeError.style.display = "block";
}

repaymentType.addEventListener("change", handleRadioBtn);
interestType.addEventListener("change", handleRadioBtn);
calculateBtn.addEventListener("click", () => { handleCalculateBtn(); });