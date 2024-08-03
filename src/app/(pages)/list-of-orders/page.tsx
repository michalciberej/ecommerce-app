import deleteOrder from '@/app/actions/delete/deleteOrder';
import getOrders from '@/app/actions/get/getOrders';
import DeleteButton from '@/app/components/DeleteButton';
import Error from '@/app/components/Error';
import Pagination from '@/app/components/Pagination';
import { XMarkIcon } from '@heroicons/react/24/outline';

const NUMBER_OF_ORDERS_PER_PAGE = 13;

const ListOfOrdersPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const currentPage = Number(searchParams?.page || 1);

  const { valid, orders, pagesCount, message } = await getOrders(
    NUMBER_OF_ORDERS_PER_PAGE,
    NUMBER_OF_ORDERS_PER_PAGE * (currentPage - 1)
  );

  return (
    <main className='py-4 px-2'>
      <section className='flex flex-col gap-4'>
        <h1 className='text-3xl'>List of Orders</h1>
        {valid ? (
          <table className='w-full bg-neutral-50 rounded-md shadow-md p-4 ring-1 overflow-hidden ring-neutral-500'>
            <thead>
              <tr className='w-full border-b border-neutral-500 p-2 flex items-center justify-between sm:gap-8'>
                <th className='text-start sm:max-w-56 sm:min-w-[20ch] w-full gap-1 sm:gap-8'>
                  Order Id
                </th>
                <th className='text-start w-full'>Number</th>
                <th className='text-start w-full'>Title</th>
                <th className='text-start w-full'>Quantity</th>
                <th className='text-start w-full'>Total Price</th>
                <th className='p-1'>
                  <XMarkIcon className='w-6 h-6 text-transparent' />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`flex p-2 [&:not(:last-child)]:border-b border-neutral-500 justify-between items-center gap-1 sm:gap-8 ${
                      index % 2 === 0 && 'bg-orange-50/80'
                    }`}>
                    <td className='sm:max-w-56 w-full sm:min-w-[20ch] truncate'>
                      {order.id}
                    </td>
                    <td className='w-full'>{order.orderNumber}</td>
                    <td className='w-full capitalize'>{order.product.title}</td>
                    <td className='w-full'>{order.quantity} x</td>
                    <td className='w-full '>
                      {order.quantity * order.product.price} Kč
                    </td>
                    <td>
                      <DeleteButton
                        id={order.id}
                        action={deleteOrder}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='w-full text-center py-6'>No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <Error message={message} />
        )}
        <Pagination pagesCount={pagesCount} />
      </section>
    </main>
  );
};

export default ListOfOrdersPage;
