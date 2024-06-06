import { PropTypes } from "prop-types"

const ExpenseForm = ({ addExpense, expenseFormData, handleInputChange, toggleExpensesForm }) => {
  return (
    <div>
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
    </div>
  )
}

ExpenseForm.propTypes = {
    addExpense: PropTypes.func,
    expenseFormData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func,
    toggleExpensesForm: PropTypes.func,
}

export default ExpenseForm