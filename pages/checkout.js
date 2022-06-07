import React from 'react'
import OrderForm from '../components/orders/OrderForm'
import OrderSummary from '../components/orders/OrderSummary'

const checkout = () => {
  return (
    <div className="container p-12 mx-auto">
      <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
        {/* <div className="flex flex-col md:w-full">
          <OrderForm />
        </div> */}
        <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default checkout