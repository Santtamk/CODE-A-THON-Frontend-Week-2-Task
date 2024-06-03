
import { useState } from 'react'
import './App.css'
import Wallet from './components/wallet/WalletAndExpenses'

function App() {

  //balance update 
  const [balance, setBalance] = useState(5000);
  const [addingToWallet,setAddingToWallet] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => { setShowForm(!showForm) }

  const addBalance = (e) => {
    e.preventDefault()
    setBalance(balance + parseInt(addingToWallet, 10))
    setAddingToWallet(0)
    toggleForm();
  }


  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div>
          <Wallet title='Wallet Balance' amount={balance} color='green' buttonText='+ Add Income' toggleForm={toggleForm}/>
          <Wallet title='Expenses' amount={500} color='red' buttonText='+ Add Expense'/>
          {/* <ExpensesChart /> */}
        </div>
        {showForm && (
            <form onSubmit={addBalance}>
              <input type="number" onChange={e => setAddingToWallet(parseInt(e.target.value,10))} value={addingToWallet} required/>
              <input type="submit" value="Add Balance"/>
            </form>
         )} 
      </div>
    </>
  )
}

export default App
