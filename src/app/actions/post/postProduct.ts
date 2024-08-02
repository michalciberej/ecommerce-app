'use server';

import prisma from '@/app/lib/prismadb';
import { ToastTypeUnion } from '@/app/components/Toast';

const postProduct = async (formData: FormData) => {
  const { title, price } = {
    title: String(formData.get('title')).trim(),
    price: Number(formData.get('price')),
  };

  if (!price || !title)
    return {
      valid: false,
      type: 'warning' as ToastTypeUnion,
      message: 'You must pass in title and price of the product!',
    };

  if (price < 0)
    return {
      valid: false,
      type: 'warning' as ToastTypeUnion,
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
      type: 'success' as ToastTypeUnion,
      message: `Product ${title} was created or updated!`,
    };
  } catch (error) {
    return {
      valid: false,
      type: 'error' as ToastTypeUnion,
      message: 'Something went wrong!',
    };
  }
};

export default postProduct;
