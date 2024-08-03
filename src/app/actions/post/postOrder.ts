'use server';

import { ToastTypeUnion } from '@/app/components/Toast';
import prisma from '@/app/lib/prismadb';

const postOrder = async (formData: FormData, id: string) => {
  const quantity = Number(formData.get('quantity'));

  if (!quantity || quantity < 1)
    return {
      valid: false,
      type: 'warning' as ToastTypeUnion,
      message: 'Quantity must be positive number!',
    };

  try {
    const order = await prisma.order.findFirst({
      orderBy: { orderNumber: 'desc' },
    });

    await prisma.order.create({
      data: {
        productId: id,
        quantity,
        orderNumber: order?.orderNumber! + 1 || 1,
      },
    });

    return {
      valid: true,
      type: 'success' as ToastTypeUnion,
      message: 'Order was succesfully created!',
    };
  } catch (error) {
    return {
      valid: false,
      type: 'error' as ToastTypeUnion,
      message: 'Something went wrong!',
    };
  }
};

export default postOrder;
