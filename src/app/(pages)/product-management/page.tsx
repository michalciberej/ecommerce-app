import deleteProduct from '@/app/actions/delete/deleteProduct';
import getProducts from '@/app/actions/get/getProducts';
import DeleteButton from '@/app/components/DeleteButton';
import Pagination from '@/app/components/Pagination';
import ProductForm from '@/app/components/ProductForm';

const NUMBER_OF_PRODUCTS = 13;

const ProductManagementPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const currentPage = Number(searchParams?.page || 1);

  const { valid, products, pagesCount, message } = await getProducts(
    NUMBER_OF_PRODUCTS,
    (currentPage - 1) * NUMBER_OF_PRODUCTS
  );

  return (
    <main className='py-4 px-2'>
      <section className='flex flex-col gap-4'>
        <h1 className='text-3xl'>Product Management</h1>
        <ProductForm />
        {valid && (
          <ul className='w-full bg-neutral-100 rounded-md shadow-md p-4 ring-1 ring-inset ring-neutral-500'>
            {products.length !== 0 ? (
              products.map(({ id, price, title }) => (
                <li
                  key={id}
                  className='flex py-2 gap-20 [&:not(:last-child)]:border-b border-neutral-500 justify-between items-center'>
                  <div className='flex gap-8 w-full'>
                    <span className='flex capitalize flex-1'>{title}</span>
                    <div className='flex gap-2 flex-1'>
                      <span className=''>{price}</span>
                      <span className='text-neutral-500'>Kč</span>
                    </div>
                  </div>
                  <DeleteButton
                    id={id}
                    action={deleteProduct}
                  />
                </li>
              ))
            ) : (
              <li className='w-full text-center'>No Products</li>
            )}
          </ul>
        )}
        <Pagination pagesCount={pagesCount} />
      </section>
    </main>
  );
};

export default ProductManagementPage;
