import React from 'react'

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props
  return (
    <div ref={ref} className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                {/* ID */}
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                {/* Name */}
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                {/* Price */}
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                {/* Quantity */}
              </th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  {/* <div className="mt-0.5 text-gray-500 sm:hidden">
                    ${item.price}
                  </div> */}
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell"></td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell"></td>
                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0"></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
              >
                Subtotal
              </th>
              <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">
                Subtotal
              </th>
              <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">${totalAmount.toLocaleString('en-AU')}</td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Total
              </th>
              <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                Total
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                ${totalAmount.toLocaleString('en-AU')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});