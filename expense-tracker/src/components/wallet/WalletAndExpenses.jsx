import { PropTypes } from "prop-types"

const WalletAndExpenses = ({ amount, color, buttonText, title, toggleForm }) => {

  return (
    <div>
        <div>{title}:₹{amount}</div>
        <button style={{ backgroundColor: color }} onClick={toggleForm}> {buttonText} </button>
    </div>
  )
}

WalletAndExpenses.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number,
    color: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    toggleForm: PropTypes.func,
}

export default WalletAndExpenses