import { useContext } from 'react'
import CartContext from '../../store/context/cart-context'

const OrderSummary = () => {
  const cartCtx = useContext(CartContext)

  const numOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount
  }, 0)

  return (
    <div className="pt-12 md:pt-0 2xl:ps-4">
      <h2 className="text-xl font-bold">Order Summary
      </h2>
      <div className="mt-8">
        <div className="flex flex-col space-y-4">
          {cartCtx.items.map(item => (
            <div className="flex space-x-4" key={item.id}>
              <div>
                <img src="https://source.unsplash.com/user/erondu/1600x900" alt="image"
                  className="w-60" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                <span className="text-red-600">Price</span> $20
              </div>
              <div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex p-4 mt-4">
        <h2 className="text-xl font-bold"># of Items: {numOfCartItems}</h2>
      </div>
      <div
        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
        Subtotal<span className="ml-2">$40.00</span></div>
      <div
        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
        Shipping Tax<span className="ml-2">$10</span></div>
      <div
        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
        Total<span className="ml-2">$50.00</span></div>
    </div>
  )
}

export default OrderSummary