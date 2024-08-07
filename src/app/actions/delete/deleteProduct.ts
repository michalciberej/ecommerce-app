'use server';

import { ToastTypeUnion } from '@/app/components/Toast';
import prisma from '@/app/lib/prismadb';

const deleteProduct = async (id: string) => {
  if (!id)
    return {
      valid: false,
      type: 'warning' as ToastTypeUnion,
      message: 'You must pass in id of product!',
    };

  try {
    await prisma.product.delete({
      where: { id },
    });

    return {
      valid: true,
      type: 'success' as ToastTypeUnion,
      message: 'Product succesfully deleted!',
    };
  } catch (error) {
    return {
      valid: false,
      type: 'error' as ToastTypeUnion,
      message: 'Something went wrong!',
    };
  }
};

export default deleteProduct;
