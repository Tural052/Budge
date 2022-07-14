const budget = document.getElementById("budget-input");
const expense = document.getElementById("expense-input");
const amount = document.getElementById("amount-input");
const budgetText = document.getElementById("budget-amount");
const list = document.getElementById("expense-list");
const expensevAmont = document.getElementById("expense-amount");
const balans = document.getElementById("balance-amount");
// ! button
const calculate = document.getElementById("budget-submit");
const add = document.getElementById("expense-submit");


eventListers();

function eventListers() {
    calculate.addEventListener("click", formValidationControler);
    add.addEventListener("click", addFormValidation);
    list.addEventListener("click", deleteList)
}

function formValidationControler(e) {
    let text = budget.value.trim();
    budgetText.innerHTML = text;
    endBalans();
    e.preventDefault();
}

function addFormValidation(e) {
    let text = expense.value.trim();
    let value = amount.value.trim();
    let all = parseFloat(expensevAmont.innerText.trim()) + parseFloat(value);
    if (text !== "" && value !== "") {
        list.innerHTML +=
            `
                <div class="expense">
                  <div class="expense-item d-flex justify-content-between align-items-baseline">
                    <h6 class="expense-title mb-0 text-uppercase list-item">- ${text}</h6>
                    <h5 class="expense-amount mb-0 list-item">${value}</h5>
                    <div class="expense-icons list-item">
                    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="#" class="delete-icon" data-id="${expense.id}">
                       <i class="fas fa-trash"></i>
                    </a>
                    </div>
                 </div>
               </div>
            `
        expensevAmont.innerHTML = all;
        endBalans();
    } else {

    }
    e.preventDefault();
}

function endBalans() {
    let text = budgetText.textContent;
    let value = expensevAmont.textContent;
    balans.innerHTML = parseFloat(text) - parseFloat(value);
}

function deleteList(e) {
    let targetSpace = e.target;
    if (targetSpace.className === "fas fa-trash") {
        let h5 = targetSpace.parentElement.parentElement.parentElement.children ;
        let returnBuy = h5[1].textContent;
        returnBalans(returnBuy);
        targetSpace.parentElement.parentElement.parentElement.remove();
    }else if(targetSpace.className === "fas fa-edit"){
        let H5 = targetSpace.parentElement.parentElement.parentElement.children;
        let amountEdit = H5[1].textContent;
        let textEdit = H5[0].textContent;
        amount.value = amountEdit;
        expense.value = textEdit;   
        returnBalans(amountEdit);
        targetSpace.parentElement.parentElement.parentElement.remove();
    }
}

function returnBalans(paramsValue){
    let text = balans.textContent;
    let value = expensevAmont.textContent;
    balans.innerHTML = (parseFloat(text) + parseFloat(paramsValue));
    expensevAmont.innerHTML = parseFloat(value) - parseFloat(paramsValue)
}