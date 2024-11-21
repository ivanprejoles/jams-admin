import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn, PaymentColumn } from "./components/columns";
import ClientForm from "@/components/client-form";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      Payment: {
        select: {
          id: true,
          orderId: true,
          address: true,
          amount: true,
          date: true,
          email: true,
          imageSrc: true,
          name: true,
          phone: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    userId: item.userId,
    email: item.email,
    name: item.name,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const allPaymentDetails: PaymentColumn[] = orders.flatMap((order: any) =>
    order.Payment.map((payment: any) => ({
      id: payment.id,
      orderId: payment.orderId,
      phone: payment.phone,
      address: payment.address,
      products: order.orderItems
        .map((orderItem: any) => orderItem.product.name)
        .join(", "),
      email: payment.email,
      name: payment.name,
      date: format(payment.date, "MMM do, yyyy"),
      amount: formatter.format(Number(payment.amount)),
      imageSrc: payment.imageSrc,
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
    }))
  );

  return (
    <div className="flex-col relative">
      <ClientForm>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OrderClient data={formattedOrders} payment={allPaymentDetails} />
        </div>
      </ClientForm>
    </div>
  );
};

export default OrdersPage;
