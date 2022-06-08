import { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'
import CartContext from '../../store/context/cart-context'

const OrderSummary = () => {
  const cartCtx = useContext(CartContext)
  const router = useRouter()
  const [checkoutSubmit, setCheckoutSubmit] = useState(false)
  const [cart, setCart] = useState(cartCtx)

  useEffect(() => {
    const cart = localStorage.getItem('cartItems') ?
      JSON.parse(localStorage.getItem('cartItems')) :
      { items: [], totalAmount: 0 }
    setCart(cart)
  }, [cartCtx])

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const submitOrderHandler = async () => {
    setCheckoutSubmit(true)
    try {
      const newOrder = {
        order: {
          totalAmount: cart.totalAmount,
          items: [...cart.items]
        }
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      })

      const data = await res.json()

      setCheckoutSubmit(false)

      if (data) {
        router.push({
          pathname: '/orders/[orderId]',
          query: { orderId: data.id }
        })
      }

      const cartLocalStorage = localStorage.setItem('cartItems',
        JSON.stringify({ items: [], totalAmount: 0 })
      )

      setCart(cartLocalStorage)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <h1 className='text-center text-2xl'>Shopping cart</h1>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart && cart.items.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={"https://source.unsplash.com/user/erondu/1600x900"}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={'#'}> {product.name} </a>
                        </h3>
                        <p className="ml-4">${product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{""}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.amount}</p>

                      <div className="flex">
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                          <button
                            type="button"
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            onClick={cartItemRemoveHandler.bind(null, product.id)}
                          >
                            <span className="sr-only">Remove</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            onClick={cartItemAddHandler.bind(null, product)}
                          >
                            <span className="sr-only">Add</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${cartCtx.totalAmount.toLocaleString('en-AU')}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button
            type='button'
            disabled={checkoutSubmit}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 disabled:text-gray-800"
            onClick={submitOrderHandler}
          >
            {checkoutSubmit ? "Submitting" : "Checkout"}
          </button>
        </div>
        {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default OrderSummary