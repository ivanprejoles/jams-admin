"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { SalesStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: string;
  salesStatus: SalesStatus;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "salesStatus",
    header: "Demand",
    cell: ({ row }) => (
      <div className="flex items-center line-clamp-1 gap-x-2">
        {row.original.salesStatus === SalesStatus.FAST ? (
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
            High
          </Badge>
        ) : (
          <Badge className=" bg-black text-white border border-gray-300">
            Low
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <div className="flex items-center line-clamp-1 gap-x-2">
        {row.original.sizes.join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.colors.map((color, index) => (
          <div
            key={index}
            className="h-6 w-6 rounded-full border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
