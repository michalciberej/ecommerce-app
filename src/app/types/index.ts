import { Prisma } from '@prisma/client';

export type Route = {
  label: string;
  url: string;
  id: string;
};

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: { product: true };
}>;
