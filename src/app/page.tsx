import getProducts from '@/app/actions/get/getProducts';
import InfiniteScroll from '@/app/components/InfiniteScroll';
import Error from '@/app/components/Error';
import Footer from '@/app/components/Footer';

const NUMBER_OF_PRODUCTS = 12;

const HomePage = async () => {
  const { valid, products, message } = await getProducts(NUMBER_OF_PRODUCTS, 0);

  return (
    <>
      <main>
        <section className='py-8 px-2'>
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
      <Footer />
    </>
  );
};

export default HomePage;
