import { PropTypes } from "prop-types"

const Wallet = ({ amount,color,buttonText,title,toggleForm }) => {

  return (
    <div>
        <div>{title}:
            ₹{amount}
            </div>
        <button style={{ backgroundColor: color }} onClick={toggleForm}> {buttonText} </button>
    </div>
  )
}

Wallet.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    toggleForm: PropTypes.func,
}

export default Wallet