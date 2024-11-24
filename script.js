//budget class for calculation
class Budget {
  constructor() {
    //empty arrays to store income and expense entries
    this.income = [];
    this.expenses = [];
    //intialize total values
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalBudget = 0;
  }

  //Method to add income
  addIncome(description, amount) {
    //validate input to make sure description is not empty and amount is a postive number
    if (!description || amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid description");
      return; //stop if input is invalid
    }
    //add expense entry to the expense array
    this.income.push({ description, amount });
    //update the total income
    this.totalIncome += amount;
    //recalculate and update the total budget
    this.updateBudget();
    //add income to the transction log
    this.addToLog("Income", description, amount);
  }

  //Method to add an expense
  addExpense(description, amount) {
    //check if description and amount are valid
    if (!description || amount <= 0 || isNaN(amount)) {
      alert("Please enter valid description");
      return;
    }
    //add the expense entry to the expense array
    this.expenses.push({ description, amount });
    //update the total expenses
    this.totalExpenses += amount;
    //recalculate and update the total budget
    this.updateBudget();
    //add the expense to the log
    this.addToLog("Expense", description, amount);
  }
  //Method to update total budget
  updateBudget() {
    //calculate the total budget as the difference betweeen income and expenses
    this.totalBudget = this.totalIncome - this.totalExpenses;
    //call displaySummary to update the display values
    this.displaySummary();
  }
  //Method to update the UI current
  displaySummary() {
    document.getElementById("total-income").textContent =
      this.totalIncome.toFixed(2);
    document.getElementById("total-expenses").textContent =
      this.totalExpenses.toFixed(2);
    document.getElementById("total-budget").textContent =
      this.totalBudget.toFixed(2);
  } //.tofixed(2)is a method that formats a # as a string with a specified # of decimal places
  addToLog(type, description, amount) {
    //get the log table body element
    const logTableBody = document
      .getElementById("log-table")
      .getElementsByTagName("tbody")[0];
    //create a new row
    const row = logTableBody.insertRow();
    //insert cells for type description, and amount
    const cellType = row.insertCell(0);
    const cellDescription = row.insertCell(1);
    const cellAmount = row.insertCell(2);

    //set the text content for the cells
    cellType.textContent = type;
    cellDescription.textContent = description;
    cellAmount.textContent = `$${amount.toFixed(2)}`;
  }
  //clear all transaction and rest the budget
  clearAll() {
    this.income = [];
    this.expenses = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalBudget = 0;
    //update the display summary
    this.displaySummary();
    //clear the log table
    this.clearLogTable();
  }
  //method to clear the log table
  clearLogTable() {
    const logTableBody = document
      .getElementById("log-table")
      .getElementsByTagName("tbody")[0];
    logTableBody.innerHTML = ""; // clears all rows in the log table
  }
}
//create an instance of the budget class
const budget = new Budget();
// //event listner for the "add income" button
document.getElementById("add-income").addEventListener("click", () => {
  const description = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value); //convert to float

  //add income via the budget instance method
  budget.addIncome(description, amount);
  //clear input field
  document.getElementById("income-description").value = "";
  document.getElementById("income-amount").value = "";
});
//event listner for the "add expense"button
document.getElementById("add-expense").addEventListener("click", () => {
  //get value from the input field for expense
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  //add expense by the budget instance method
  budget.addExpense(description, amount);
  //clear input field after adding expense
  document.getElementById("expense-description").value = "";
  document.getElementById("expense-amount").value = "";
});
document.getElementById("clear-all").addEventListener("click", () => {
  budget.clearAll();
});
