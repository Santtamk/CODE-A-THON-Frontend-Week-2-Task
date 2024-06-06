import { useEffect, useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./App.css";
import WalletForm from "./components/forms/WalletForm";
import ExpenseForm from "./components/forms/ExpenseForm";
import WalletAndExpenses from "./components/wallet/WalletAndExpenses";
import ExpensesPieChart from "./components/charts/ExpensePieChart.jsx";
// import  { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
// import ExpenseForm from "./components/forms/WalletForm";

// // fpr pichart
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
  //balance update
  const [balance, setBalance] = useState(() => {
    try {
      const savedBalance = localStorage.getItem("balance");
      return savedBalance !== null ? JSON.parse(savedBalance) : 5000;
    } catch (e) {
      console.error("this is the error message on balance", e);
      return 5000;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses !== null ? JSON.parse(savedExpenses) : [];
    } catch (e) {
      console.error("this is the error message on expense", e);
      return [];
    }
  });

  //state of the wallet & expense value in form
  const [addingToWallet, setAddingToWallet] = useState(0);
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  //form toggle state change
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState();

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleBalanceForm = () => {
    setShowIncomeForm(!showIncomeForm);
    if (showExpenseForm) setShowIncomeForm(false);
  };

  const toggleExpensesForm = () => {
    setShowExpenseForm(!showExpenseForm);
    if (showIncomeForm) setShowExpenseForm(false);
  };

  const addBalance = (e) => {
    e.preventDefault();
    const amountToAdd = parseInt(addingToWallet, 10);
    setBalance((prevBalance) => prevBalance + amountToAdd);
    setAddingToWallet(0);
    toggleBalanceForm();
  };

  useEffect(() => {
    setTotalExpenses(
      expenses.reduce((total, expense) => total + expense.price, 0)
    );
  }, [expenses]);


  const addExpense = (e) => {
    e.preventDefault();

    //form data
    const title = expenseFormData.title;
    const price = parseFloat(expenseFormData.price);
    const category = expenseFormData.category;
    const date = expenseFormData.date;

    // Check if all form fields are filled
    if (!title || isNaN(price) || !category || !date) {
      // Display an error message or handle invalid form data
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    // Check if the expense is greater than the balance
    const newTotalExpenses = totalExpenses + price;
    if (newTotalExpenses > balance) {
      enqueueSnackbar("Your expense is greater than your balance", {
        variant: "error",
      });
      return;
    }
    //new expense object
    const newExpense = {
      title,
      price,
      category,
      date,
    };

    //expense state
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    //reset form fields
    e.target.reset();

    setExpenseFormData({
      title: "",
      price: "",
      category: "",
      date: "",
    });

    toggleExpensesForm();
  };

  const clearAll = () => {
    //Reset state
    setBalance(5000);
    setExpenses([]);
    //clear local storage
    localStorage.removeItem("balance");
    localStorage.removeItem("expenses");
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <div>
          <h1>Expense Tracker</h1>
          <div>
            <WalletAndExpenses
              title="Wallet Balance"
              amount={balance}
              color="green"
              buttonText="+ Add Income"
              toggleForm={toggleBalanceForm}
            />
            <WalletAndExpenses
              title="Expenses"
              amount={totalExpenses}
              color="red"
              buttonText="+ Add Expense"
              toggleForm={toggleExpensesForm}
            />
          </div>
          <div>
            {showIncomeForm && (
              <WalletForm
                addBalance={addBalance}
                setAddingToWallet={setAddingToWallet}
                toggleBalanceForm={toggleBalanceForm}
              />
            )}
            {showExpenseForm && (
              <ExpenseForm
                addExpense={addExpense}
                expenseFormData={expenseFormData}
                handleInputChange={handleInputChange}
                toggleExpensesForm={toggleExpensesForm}
              />
            )}
          </div>
          <ExpensesPieChart expenses={expenses} />
        </div>
      </SnackbarProvider>
      <button onClick={clearAll}>Clear All</button>
    </>
  );
}

export default App;
