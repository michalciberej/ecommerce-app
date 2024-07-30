'use server';

import { ToastTypeUnion } from '@/app/components/Toast';
import prisma from '@/app/lib/prismadb';

const deleteOrder = async (id: string) => {
  if (!id)
    return {
      valid: false,
      type: 'warning' as ToastTypeUnion,
      message: 'You must pass in id of order!',
    };

  try {
    await prisma.order.delete({ where: { id } });
    return {
      valid: true,
      type: 'success' as ToastTypeUnion,
      message: 'Order was succesfully deleted!',
    };
  } catch (error) {
    return {
      valid: true,
      type: 'error' as ToastTypeUnion,
      message: 'Something went wrong!',
    };
  }
};

export default deleteOrder;
