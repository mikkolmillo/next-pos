export const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART':
      return {
        items: action.cart.items,
        totalAmount: action.cart.totalAmount
      }
    case 'ADD':
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
      const existingCartItem = state.items[existingCartItemIndex]
      let updatedItems

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        }

        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify({
          items: updatedItems,
          totalAmount: updatedTotalAmount
        }))
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    case 'REMOVE':
      const existingCartItemIndex_2 = state.items.findIndex(item => item.id === action.id)
      const existingCartItem_2 = state.items[existingCartItemIndex_2]
      const updatedTotalAmount_2 = state.totalAmount - existingCartItem_2.price

      let updatedItems_2

      if (existingCartItem_2.amount === 1) {
        updatedItems_2 = state.items.filter(item => item.id !== action.id)
      } else {
        const updatedItem_2 = { ...existingCartItem_2, amount: existingCartItem_2.amount - 1 }
        updatedItems_2 = [...state.items]
        updatedItems_2[existingCartItemIndex_2] = updatedItem_2
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify({
          items: updatedItems_2,
          totalAmount: updatedTotalAmount_2
        }))
      }

      return {
        items: updatedItems_2,
        totalAmount: updatedTotalAmount_2
      }
    default:
      return defaultCartState
  }
}

export default cartReducer