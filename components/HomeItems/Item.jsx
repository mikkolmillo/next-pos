import React from 'react'

const Item = ({id, name, code, price}) => {
  const formattedPrice = `$${price}`

  return (
    <li key={id} className="relative">
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img src={'https://source.unsplash.com/collection/1927551/1600x900'} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{name}</p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">{formattedPrice}</p>
    </li>
  )
}

export default Item