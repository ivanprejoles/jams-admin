"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductColumn } from "./columns";

import { AlertModal } from "@/components/modals/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Edit,
  MoreHorizontal,
  PackagePlus,
  Trash,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { SalesStatus } from "@prisma/client";
import { AddStockDialog } from "./add-stock-dialog";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.refresh();
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const addStock = async (value: number) => {
    try {
      const body = { value };
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/products/${data.id}/stock`, body);
      router.refresh();
      toast.success("Stock Added.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const changeDemand = async (status: SalesStatus) => {
    try {
      const body = { status };
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/products/${data.id}/demand`, body);
      router.refresh();
      toast.success("Demand Updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <AddStockDialog data={data} addStock={addStock} />
          {data.salesStatus === SalesStatus.FAST ? (
            <DropdownMenuItem
              onClick={() => changeDemand(SalesStatus.SLOW)}
              className="text-red-400"
            >
              <TrendingDown className="mr-2 h-4 w-4 text-red-400" />
              Low Demand
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => changeDemand(SalesStatus.FAST)}
              className="text-green-400"
            >
              <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
              High Demand
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="!text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
