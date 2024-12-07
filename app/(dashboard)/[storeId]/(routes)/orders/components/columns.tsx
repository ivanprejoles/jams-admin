"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ImageCellAction } from "./image-cell-action";
import OrderTooltipWrapper from "@/components/ui/product-tooltip-wrapper";
import { formatProducts } from "@/lib/utils";

export type OrderProduct = {
  name: string;
  quantity: number;
  sizes: string[];
  colors: string[];
};

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  email: string;
  name: string;
  userId: string;
  isPaid: boolean;
  totalPrice: string;
  products: OrderProduct[];
  createdAt: string;
};

export type PaymentColumn = {
  id: string;
  orderId: string;
  phone: string;
  products: string;
  address: string;
  email: string;
  name: string;
  date: Date;
  amount: number;
  imageSrc: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const { formattedWithBr, formattedWithoutBr } = formatProducts(
        row.original.products
      );
      return (
        <OrderTooltipWrapper
          maxLength={10}
          value={formattedWithoutBr}
          text={formattedWithBr}
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const paymentColumns: ColumnDef<PaymentColumn>[] = [
  {
    accessorKey: "imageSrc",
    header: "Image",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date Paid",
  },
  {
    id: "actions",
    cell: ({ row }) => <ImageCellAction data={row.original} />,
  },
];
