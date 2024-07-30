import getProducts from '@/app/actions/get/getProducts';
import InfiniteScroll from '@/app/components/InfiniteScroll';
import Error from '@/app/components/Error';

const NUMBER_OF_PRODUCTS = 12;

const HomePage = async ({
  searchParams,
}: {
  searchParams?: { page?: number };
}) => {
  const currentPage = Number(searchParams?.page || 1);

  const { valid, products, message } = await getProducts(
    NUMBER_OF_PRODUCTS * currentPage,
    0
  );

  return (
    <main>
      <section className='py-4 px-2'>
        {valid ? (
          <InfiniteScroll
            initialData={products}
            records={NUMBER_OF_PRODUCTS}
          />
        ) : (
          <Error message={message} />
        )}
      </section>
    </main>
  );
};

export default HomePage;
