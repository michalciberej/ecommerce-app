'use server';

import { ToastTypeUnion } from '@/app/components/Toast';
import prisma from '@/app/lib/prismadb';

const getProducts = async (take: number, skip: number) => {
  try {
    const products = await prisma.product.findMany({ take, skip });
    const pagesCount = await prisma.product.count({});

    return {
      valid: true,
      products,
      type: 'success' as ToastTypeUnion,
      pagesCount: Math.ceil(pagesCount / take),
      message: '',
    };
  } catch (error) {
    return {
      valid: false,
      type: 'error' as ToastTypeUnion,
      products: [],
      pagesCount: 0,
      message: 'Something went wrong!',
    };
  }
};

export default getProducts;
