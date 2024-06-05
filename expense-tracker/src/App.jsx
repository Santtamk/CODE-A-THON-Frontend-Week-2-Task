import { useEffect, useState } from "react";
import "./App.css";
import Wallet from "./components/wallet/WalletAndExpenses";

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
      return savedExpenses !== null
        ? JSON.parse(savedExpenses)
        : [
            // {
            //   title: "",
            //   price: 0,
            //   category: "",
            //   date: "",
            // },
          ];
    } catch (e) {
      console.error("this is the error message on expense", e);
      return [
        // {
        //   title: "",
        //   price: 0,
        //   category: "",
        //   date: "",
        // },
      ];
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

  const addExpense = (e) => {
    e.preventDefault();

    //form data 
    // const title = e.target[0].value;
    // const price = parseFloat(e.target[1].value);
    // const category = e.target[2].value;
    // const date = e.target[3].value;
    const title = expenseFormData.title;
    const price = parseFloat(expenseFormData.price);
    const category = expenseFormData.category;
    const date = expenseFormData.date;

    // Check if all form fields are filled
  if (!title || isNaN(price) || !category || !date) {
    // Display an error message or handle invalid form data
    alert("Please fill in all fields");
    return;
  }

    //new expense object
    const newExpense = {
      // title: expenseFormData.title,
      // price: parseFloat(expenseFormData.price),
      // category: expenseFormData.category,
      // date: expenseFormData.date,
      title,
      price,
      category,
      date,
    };
    
    //expense state
    setExpenses((prevExpenses) => [...prevExpenses, newExpense])
    
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
    localStorage.removeItem('balance');
    localStorage.removeItem('expenses');
  }

  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div>
          <Wallet
            title="Wallet Balance"
            amount={balance}
            color="green"
            buttonText="+ Add Income"
            toggleForm={toggleBalanceForm}
          />
          <Wallet
            title="Expenses"
            amount={500}
            color="red"
            buttonText="+ Add Expense"
            toggleForm={toggleExpensesForm}
          />
          {/* <ExpensesChart /> */}
        </div>
        <div>
          {showIncomeForm && (
            <form onSubmit={addBalance}>
              <h3>Add Balance</h3>
              <input
                type="number"
                onChange={(e) =>
                  setAddingToWallet(parseInt(e.target.value, 10))
                }
                // value={addingToWallet}
                placeholder="Income Amount"
                required
              />
              <input type="submit" value="Add Balance" />
              <button onClick={toggleBalanceForm}>Cancel</button>
            </form>
          )}
          {showExpenseForm && (
            <form onSubmit={addExpense}>
              <h3>Add Expenses</h3>
              <input 
                type="text" 
                name="title"
                placeholder="Title" 
                value={expenseFormData.title}
                onChange={handleInputChange} 
                required 
              />
              <input 
                type="number" 
                placeholder="Price" 
                name="price"
                value={expenseFormData.price}
                onChange={handleInputChange}
                required 
              />
                <select 
                  name="category" 
                  id="categories" 
                  value={expenseFormData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel">Travel</option>
                </select>
              <input 
                type="date" 
                name="date"
                placeholder="dd/mm/yyyy" 
                value={expenseFormData.date}
                onChange={handleInputChange}
                required 
              />
              <input type="submit" value="Add Expense" />
              <button onClick={toggleExpensesForm}>Cancel</button>
            </form>
          )}
        </div>
      </div>
      <button onClick={clearAll}>Clear All</button>
    </>
  );
}

export default App;
