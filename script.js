const form = document.getElementById("form");

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
const monthlyRepayment = document.getElementById("monthly-repay");
const totalRepayment = document.getElementById("total-repay");

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

function validateAndCalculateMortgage() {
    const validation = {
        "amount": false,
        "term": false,
        "interest": false,
    };

    const amountStr = mortgageAmount.value.trim();
    const termStr = mortgageTerm.value.trim();
    const interestStr = mortgageInterest.value.trim();
    let amount = 0, term = 0, interest = 0;

    if (amountStr) {
        amount = Number(amountStr);
        validation["amount"] = true;
    }
    else {
        updateErrorClass(amountSymbol, true, "error-symbol");
        updateErrorClass(mortgageAmount.parentElement, true, "error-input");
        amountError.style.display = "block";
    }

    if (termStr) {
        term = Number(termStr);
        validation["term"] = true;
    }
    else {
        updateErrorClass(termSymbol, true, "error-symbol");
        updateErrorClass(mortgageTerm.parentElement, true, "error-input");
        termError.style.display = "block";
    }


    if (interestStr) {
        interest = Number(interestStr);
        validation["interest"] = true;
    }
    else {
        updateErrorClass(interestSymbol, true, "error-symbol");
        updateErrorClass(mortgageInterest.parentElement, true, "error-input");
        interestError.style.display = "block";
    }

    if (repaymentType.checked || interestType.checked) {
        if (validation["amount"] && validation["term"] && validation["interest"]) {
            calculateMortgage(amount, term, interest, interestType.checked);
        }
    }
    else {
        typeError.style.display = "block";
    }
}

function resetOutput() {
    updateErrorClass(amountSymbol, false, "error-symbol");
    updateErrorClass(mortgageAmount.parentElement, false, "error-input");
    amountError.style.display = "none";

    updateErrorClass(termSymbol, false, "error-symbol");
    updateErrorClass(mortgageTerm.parentElement, false, "error-input");
    termError.style.display = "none";

    updateErrorClass(interestSymbol, false, "error-symbol");
    updateErrorClass(mortgageInterest.parentElement, false, "error-input");
    interestError.style.display = "none";
    typeError.style.display = "none";
    emptyResult.style.display = "flex";
    calculatedResult.style.display = "none";
}

function calculateMortgage(amount, term, interest, isInterestOnly) {
    emptyResult.style.display = "none";
    calculatedResult.style.display = "flex";
    const monthlyInterst = interest / (12 * 100);
    const totalMonths = term * 12;
    const powerVar = Math.pow((monthlyInterst + 1), totalMonths);
    const payPerMonth = amount * monthlyInterst * powerVar / (powerVar - 1);
    const totalAmount = payPerMonth * totalMonths;
    if (isInterestOnly) {
        const interestAmount = totalAmount - amount;
        monthlyRepayment.textContent = `${(interestAmount / totalMonths).toFixed(2)}`;
        totalRepayment.textContent = `${interestAmount.toFixed(2)}`;
    }
    else {
        monthlyRepayment.textContent = `${payPerMonth.toFixed(2)}`;
        totalRepayment.textContent = `${totalAmount.toFixed(2)}`;
    }
}

repaymentType.addEventListener("change", handleRadioBtn);
interestType.addEventListener("change", handleRadioBtn);
form.addEventListener("submit", (event) => {
    resetOutput();
    event.preventDefault();
    validateAndCalculateMortgage();
});