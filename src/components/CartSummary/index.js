



import CartContext from '../../context/CartContext'
import OrderPlaced from "../OrderPlaced"



import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmout = cartList
        .map(each => each.price * each.quantity)
        .reduce((a, b) => a + b)

        const clickCheckOut = () =>{
            console.log(totalAmout,"total")
            return (
                <OrderPlaced data={totalAmout}/>
            )
            
        }
      console.log(totalAmout)
      return (
        <div className="cart-summary-container">
          <h1 className="total-orders-text">
            Order Total:{' '}
            <span className="span-text-order-total">Rs {totalAmout}/-</span>
          </h1>
          <p className="items-count-text">{cartList.length} Items in cart</p>
          <button type="button" className="buttn" onClick={clickCheckOut}>
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
