'use server';

import prisma from '@/app/lib/prismadb';

const deleteOrder = async (id: string) => {
  if (!id) return { valid: false, message: 'You must pass in id of order!' };

  try {
    await prisma.order.delete({ where: { id } });
    return { valid: true, message: 'Order was succesfully deleted!' };
  } catch (error) {
    return { valid: true, message: 'Something went wrong!' };
  }
};

export default deleteOrder;
