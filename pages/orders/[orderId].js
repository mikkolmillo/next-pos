import { useRouter } from 'next/router';
import { PaperClipIcon } from '@heroicons/react/solid'

const projects = [
  { id: 1, name: 'New Advertising Campaign', hours: '12.0', rate: '$75.00', price: '$900.00' },
  // More projects...
]

const OrderPage = ({ order }) => {
  const router = useRouter()

  router.query
  return (
    <div className="bg-gray-300 h-screen overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6 lg:m-14 m-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Order Detail</h3>
            <p className="mt-1 text-nd text-gray-500">Order # <span className='font-bold'>{order.id}</span></p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">Margot Foster</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900">margotfoster@example.com</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                  qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                  pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
              </div> */}
              <div className="sm:col-span-2">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Hours
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-gray-900">{project.name}</div>
                          <div className="mt-0.5 text-gray-500 sm:hidden">
                            {project.hours} hours at {project.rate}
                          </div>
                        </td>
                        <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{project.hours}</td>
                        <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{project.rate}</td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{project.price}</td>
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
                      <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$3,900.00</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                      >
                        Tax
                      </th>
                      <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">
                        Tax
                      </th>
                      <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$585.00</td>
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
                        $4,485.00
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const orderId = params.orderId

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/orders/${orderId}`)
    const loadedOrder = await res.json()

    console.log(loadedOrder);
    return {
      props: {
        order: loadedOrder
      }
    }
  } catch (error) {

  }

  return {
    props: {
      order: {}
    }
  }
}

export default OrderPage