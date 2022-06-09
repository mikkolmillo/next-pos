import { useReducer, useState, useEffect } from "react"
// import { useLocalStorage } from "../../hookes/useLocalStorage"
import CartContext from "../context/cart-context"
import cartReducer, { defaultCartState } from "../reducer/cart-reducer"

const CartProvider = (props) => {
  // const [id, set_id] = useLocalStorage("cartItems", defaultCartState);
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)

  const cartItemsHandler = cart => {
    dispatch({ type: 'CART', cart })
  }

  const addItemToCartHandler = item => {
    dispatch({ type: 'ADD', item })
  }

  const removeItemToCartHandler = id => {
    dispatch({ type: 'REMOVE', id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    initializeCart: cartItemsHandler,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider