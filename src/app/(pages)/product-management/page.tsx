import deleteProduct from '@/app/actions/delete/deleteProduct';
import getProducts from '@/app/actions/get/getProducts';
import DeleteButton from '@/app/components/DeleteButton';
import Pagination from '@/app/components/Pagination';
import ProductForm from '@/app/components/ProductForm';
import Error from '@/app/components/Error';
import { XMarkIcon } from '@heroicons/react/24/outline';

const NUMBER_OF_PRODUCTS_PER_PAGE = 13;

const ProductManagementPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const currentPage = Number(searchParams?.page || 1);

  const { valid, products, pagesCount, message } = await getProducts(
    NUMBER_OF_PRODUCTS_PER_PAGE,
    NUMBER_OF_PRODUCTS_PER_PAGE * (currentPage - 1)
  );

  return (
    <main className='py-4 px-2'>
      <section className='flex flex-col gap-4'>
        <h1 className='text-3xl'>Product Management</h1>
        <ProductForm />
        {valid ? (
          <table className='w-full bg-neutral-100 rounded-md shadow-md p-4 ring-1 ring-neutral-500 overflow-hidden'>
            <thead>
              <tr className='flex justify-between items-center p-2 border-b border-neutral-500 bg-neutral-50'>
                <th className='w-full text-start'>Title</th>
                <th className='w-full text-start'>Price</th>
                <th className='text-transparent'>
                  <XMarkIcon className='w-6 h-6' />
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(({ id, price, title }, index) => (
                  <tr
                    key={id}
                    className={`flex p-1 [&:not(:last-child)]:border-b border-neutral-500 justify-between items-center ${
                      index % 2 === 0 ? 'bg-orange-50/80' : 'bg-neutral-50'
                    }`}>
                    <td className='flex gap-8 w-full'>
                      <span className='flex capitalize w-full'>{title}</span>
                    </td>
                    <td className='flex gap-2 w-full'>
                      <span className='min-w-[4ch]'>{price}</span>
                      <span>Kč</span>
                    </td>
                    <td>
                      <DeleteButton
                        id={id}
                        action={deleteProduct}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <li className='w-full text-center'>No Products</li>
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

export default ProductManagementPage;
