import { useReducer, useState, useEffect } from "react"
import CartContext from "../context/cart-context"
import cartReducer, { defaultCartState } from "../reducer/cart-reducer"

// let defaultCartState = {
//   items: [],
//   totalAmount: 0,
// }

// if (typeof window !== 'undefined') {
//   defaultCartState = JSON.parse(localStorage.getItem('cartItems'))
// }

const CartProvider = (props) => {
  // const [cart, setCart] = useState(defaultCartState);
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)
  console.log(cartState);
  // useEffect(() => {
  //   const cartData = JSON.parse(localStorage.getItem("cartItems"));
  //   if (cartData) {
  //     setCart(cartData);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (cart !== defaultCartState) {
  //     localStorage.setItem("cartItems", JSON.stringify(cart));
  //   }
  // }, [cart])
  

  const addItemToCartHandler = item => {
    dispatch({ type: 'ADD', item })
  }

  const removeItemToCartProvider = id => {
    dispatch({ type: 'REMOVE', id })
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