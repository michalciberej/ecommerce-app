'use server';

import prisma from '@/app/lib/prismadb';

const postProduct = async (formData: FormData) => {
  const { title, price } = {
    title: String(formData.get('title')),
    price: Number(formData.get('price')),
  };

  if (!price || !title)
    return {
      valid: false,
      message: 'You must pass in title and price of the product!',
    };

  if (price < 0)
    return {
      valid: false,
      message: 'Price must be positive intiger!',
    };

  const lowerCaseTitle = title.toLowerCase();

  try {
    await prisma.product.upsert({
      where: { title: lowerCaseTitle },
      update: { price },
      create: { title: lowerCaseTitle, price },
    });

    return {
      valid: true,
      message: `Product ${title} was created or updated!`,
    };
  } catch (error) {
    return { valid: false, message: 'Something went wrong!' };
  }
};

export default postProduct;
