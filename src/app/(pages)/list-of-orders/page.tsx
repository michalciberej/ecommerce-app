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
          <ul className='w-full bg-neutral-100 rounded-md shadow-md p-4 ring-1 ring-inset ring-neutral-500'>
            <li className='w-full border-b border-neutral-500 py-2 justify-between flex items-center'>
              <span className='sm:min-w-56 w-full'>Order Id</span>
              <span className='min-w-20 w-full'>Price</span>
              <span className='min-w-20 w-full'>Quantity</span>
              <span className='min-w-20 w-full'>Total Price</span>
              <span className='p-1'>
                <XMarkIcon className='w-6 h-6 text-transparent' />
              </span>
            </li>
            {orders.length > 0 ? (
              orders.map((order) => (
                <li
                  key={order.id}
                  className='flex py-2 [&:not(:last-child)]:border-b border-neutral-500 justify-between items-center'>
                  <span className='sm:min-w-56 w-full sm:max-w-[20ch] truncate'>
                    {order.id}
                  </span>
                  <span className='min-w-20 w-full'>{order.product.price}</span>
                  <div className='min-w-20 w-full flex gap-1'>
                    <span>{order.quantity}</span>
                    <span>x</span>
                  </div>
                  <div className='min-w-20 w-full flex gap-1'>
                    <span className='min-w-[4ch]'>
                      {order.quantity * order.product.price}
                    </span>
                    <span>Kč</span>
                  </div>
                  <DeleteButton
                    id={order.id}
                    action={deleteOrder}
                  />
                </li>
              ))
            ) : (
              <li className='w-full text-center py-6'>No orders yet</li>
            )}
          </ul>
        ) : (
          <Error message={message} />
        )}
        <Pagination pagesCount={pagesCount} />
      </section>
    </main>
  );
};

export default ListOfOrdersPage;
