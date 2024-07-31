'use server';

import prisma from '@/app/lib/prismadb';
import { OrderWithProduct } from '@/app/types';

const getOrders = async (take: number, skip: number) => {
  try {
    const orders: OrderWithProduct[] = await prisma.order.findMany({
      include: { product: true },
      take,
      skip,
    });
    const orderCount = await prisma.order.count();

    return {
      valid: true,
      type: 'success',
      orders,
      message: '',
      pagesCount: Math.ceil(orderCount / take),
    };
  } catch (error) {
    return {
      valid: false,
      type: 'error',
      message: 'Something went wrong!',
      orders: [],
      pagesCount: 0,
    };
  }
};

export default getOrders;
