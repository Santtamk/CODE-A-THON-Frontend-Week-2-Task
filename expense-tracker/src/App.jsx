
import { useEffect, useState } from 'react'
import './App.css'
import Wallet from './components/wallet/WalletAndExpenses'

function App() {

  //balance update 
  const [balance, setBalance] = useState(() => {
    try{
      const savedBalance = localStorage.getItem('balance');
      return savedBalance !== null ? JSON.parse(savedBalance) : 5000;
    }catch(e){
      console.error('this is the error message on balance', e)
      return 5000;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try{
      const savedExpenses = localStorage.getItem('expenses');
      return savedExpenses!== null? JSON.parse(savedExpenses) : [{
        title:'',
        price: 0,
        category:'',
        date: new Date,
      }];
    }catch(e){
      console.error('this is the error message on expense', e)
      return 0;
    }
  })

  const [addingToWallet,setAddingToWallet] = useState(0);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [balance, expenses]);

  const toggleBalanceForm = () => { 
    setShowIncomeForm(!showIncomeForm) 
    if(showExpenseForm) setShowIncomeForm(false)
    }
  
  const toggleExpensesForm = () => {
    setShowExpenseForm(!showExpenseForm)
    if(showIncomeForm) setShowExpenseForm(false)
    }
  
  
  const addBalance = (e) => {
    e.preventDefault()
    const amountToAdd = parseInt(addingToWallet, 10)
    setBalance(prevBalance => prevBalance + amountToAdd)
    setAddingToWallet(0)
    toggleBalanceForm();
  }
  
  const addExpense = (e) => {
    e.preventDefault()
  
  }


  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div>
          <Wallet 
            title='Wallet Balance' 
            amount={balance} 
            color='green' 
            buttonText='+ Add Income' 
            toggleForm={toggleBalanceForm}
          />
          <Wallet 
          title='Expenses' 
          amount={500} 
          color='red' 
          buttonText='+ Add Expense'
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
                    onChange={e => setAddingToWallet(parseInt(e.target.value,10))} 
                    // value={addingToWallet} 
                    placeholder='Income Amount'
                    required
                  />
                  <input 
                    type="submit" 
                    value="Add Balance"
                  /> 
                  <button onClick={toggleBalanceForm}>Cancel</button>
                </form>
            )}     
            {showExpenseForm && (
              <form onSubmit={addExpense}>
                <h3>Add Expenses</h3>
                <input type="text" placeholder='Title'/>
                <input type="number" placeholder='Price'/>
                <input type="text" placeholder='Select Category'/>
                <input type="date" placeholder='dd/mm/yyyy'/>
                <input 
                    type="submit" 
                    value="Add Expense"
                  /> 
                  <button onClick={toggleExpensesForm}>Cancel</button>
              </form>
            )}
            </div>
      </div>
    </>
  )
}

export default App
