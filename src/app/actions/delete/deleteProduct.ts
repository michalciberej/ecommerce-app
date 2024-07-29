'use server';

import prisma from '@/app/lib/prismadb';

const deleteProduct = async (id: string) => {
  if (!id) return { valid: false, message: 'You must pass in id of product!' };

  try {
    await prisma.product.delete({
      where: { id },
    });
    return { valid: true, message: 'Product succesfully deleted!' };
  } catch (error) {
    return { valid: false, message: 'Something went wrong!' };
  }
};

export default deleteProduct;
