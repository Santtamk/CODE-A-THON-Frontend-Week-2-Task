import { PropTypes } from "prop-types"

const WalletForm = ({ addBalance, setAddingToWallet, toggleBalanceForm }) => {
    return (
      <div>
        <form onSubmit={addBalance}>
                <h3>Add Balance</h3>
                <input
                  type="number"
                  onChange={(e) =>
                    setAddingToWallet(parseInt(e.target.value, 10))
                  }
                  placeholder="Income Amount"
                  required
                />
                <input type="submit" value="Add Balance" />
                <button onClick={toggleBalanceForm}>Cancel</button>
              </form>
      </div>
    )
  }

  WalletForm.propTypes = {
    addBalance: PropTypes.func,
    setAddingToWallet: PropTypes.func,
    toggleBalanceForm: PropTypes.func,
}
  
  export default WalletForm