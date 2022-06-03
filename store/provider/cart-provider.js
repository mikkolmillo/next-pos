import { useReducer } from "react"
import CartContext from "../context/cart-context"
import cartReducer, { defaultCartState } from "../reducer/cart-reducer"

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = item => {
    dispatch({type: 'ADD', item})
  }

  const removeItemToCartProvider = id => {
    dispatch({type: 'REMOVE', id})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartProvider
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider