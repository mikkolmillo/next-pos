export const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedItems = state.items.concat(action.item)
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    case 'REMOVE':

      break;
  
    default:
      return defaultCartState
  }
}

export default cartReducer