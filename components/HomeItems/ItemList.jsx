import React from 'react'
import Item from './Item'

const ItemList = ({ products }) => {
  const productList = products.map((product) => (
    <Item
      key={product.id}
      id={product.id}
      name={product.name}
      code={product.code}
      price={product.price}
    />
  ))
  
  return (
    <div className="mt-12 sm:mt-16 lg:mt-0">
      <div className='max-w-full w-auto'>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {productList}
        </ul>
      </div>
    </div>
  )
}

export default ItemList