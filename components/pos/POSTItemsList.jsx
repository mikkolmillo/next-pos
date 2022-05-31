import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { XCircleIcon, UserCircleIcon, BackspaceIcon } from '@heroicons/react/outline'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { ComponentToPrint } from '../utils/ComponentToPrint'
import { useReactToPrint } from 'react-to-print'

const POSTItemsList = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let newTotalAmount = 0

    cart.forEach(cart => newTotalAmount += cart.totalAmount)

    setTotalAmount(newTotalAmount)
  }, [cart])


  const fetchProducts = async () => {
    const res = await axios.get('/api/products')
    const data = await res.data

    console.log(data);
    setProducts(data)
  }

  const addProductToCart = async (product) => {
    // ? Check if product exist in cart
    let findProductInCart = await cart.find(p => {
      return p.id === product.id
    })

    if (findProductInCart) {
      let newCart = []
      let newItem

      cart.forEach(item => {
        if (item.id === product.id) {
          newItem = {
            ...item,
            qty: item.qty + 1,
            totalAmount: item.price * (item.qty + 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(item)
        }
      })

      setCart(newCart)
    } else {
      let addProduct = {
        ...product,
        qty: 1,
        totalAmount: product.price
      }

      setCart([...cart, addProduct])
    }
  }

  const removeToCart = async (product) => {
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
  }

  const componentRef = useRef()
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint()
  }

  return (
    <div className="relative pt-16 pb-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100" />
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              {/* Screen */}
              <div>
                <div className="hidden">
                  <ComponentToPrint
                    cart={cart}
                    totalAmount={totalAmount}
                    ref={componentRef}
                  />
                </div>
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    {totalAmount > 0 && (
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      >
                        Print
                      </button>
                    )}
                  </div>
                </div>
                <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          ID
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                          Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Qty
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Total
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {item.title}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Quantity</dt>
                              <dd className="mt-1 truncate text-gray-700">{item.qty}</dd>
                              <dt className="sr-only sm:hidden">Price</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">{item.price}</dd>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                                  <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.title}</span>
                                </button>
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.title}</td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{item.qty}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">{item.price}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">{item.totalAmount}</td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                              <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.title}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Buttons */}
              <div className="m-2 border-2">
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Laybys
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Deliveries
                  </button>
                </div>
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Quotes
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generic
                  </button>
                </div>
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Show Orders
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Products
                  </button>
                </div>
              </div>

              <div className="m-2 p-2 flex">
                <div className="flex-col justify-center items-center w-1/2 sm:w-full">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full p-3 items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Customer
                    </button>
                  </div>

                  <button className='w-full flex-col items-center pt-10'>
                    <ArrowCircleRightIcon className='h-20 w-20' />
                    <h2 className='inline-block text-2xl font-semibold'>Payment</h2>
                  </button>
                </div>

                <div className="w-1/2 sm:w-full">
                  <div className='flex-col justify-center'>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2'>1</button>
                      <button className='p-2 text-xl mx-1 border-2'>2</button>
                      <button className='p-2 text-xl mx-1 border-2'>3</button>
                      <button className='p-2 text-xl mx-1 border-2 bg-green-600'>Qty</button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2'>4</button>
                      <button className='p-2 text-xl mx-1 border-2'>5</button>
                      <button className='p-2 text-xl mx-1 border-2'>6</button>
                      <button className='p-2 text-xl mx-1 border-2'>Disc</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2'>7</button>
                      <button className='p-2 text-xl mx-1 border-2'>8</button>
                      <button className='p-2 text-xl mx-1 border-2'>9</button>
                      <button className='p-2 text-xl mx-1 border-2'>Price</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2'>+/-</button>
                      <button className='p-2 text-xl mx-1 border-2'>0</button>
                      <button className='p-2 text-xl mx-1 border-2'>.</button>
                      <button className='p-2 text-xl mx-1 border-2'>
                        <BackspaceIcon className='h-6 w-6' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='max-w-7xl w-auto'>
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((p) => (
                  <li key={p.id} className="relative" onClick={() => addProductToCart(p)}>
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                      <img src={p.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                      <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {p.title}</span>
                      </button>
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{p.title}</p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">{p.price}</p>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className='max-w-7xl w-auto'>
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((p) => (
                  <li key={p.id} className="relative" onClick={() => addProductToCart(p)}>
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                      <img src={p.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                      <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {p.title}</span>
                      </button>
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{p.title}</p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">{p.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Invoice Table */}
            {/* <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <div className="hidden">
                <ComponentToPrint
                  cart={cart}
                  totalAmount={totalAmount}
                  ref={componentRef}
                />
              </div>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  {totalAmount > 0 && (
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Print
                    </button>
                  )}
                </div>
              </div>
              <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        ID
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Qty
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                          {item.title}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Quantity</dt>
                            <dd className="mt-1 truncate text-gray-700">{item.qty}</dd>
                            <dt className="sr-only sm:hidden">Price</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">{item.price}</dd>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                                <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.title}</span>
                              </button>
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.title}</td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{item.qty}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{item.price}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{item.totalAmount}</td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                            <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.title}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default POSTItemsList