"use client";

import { useParams, useRouter } from "next/navigation";

import { SizeColumn, columns } from "./columns";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { Plus } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import LedSeparator from "@/components/ui/led-separator";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  return (
    <>
      <div className="flex items-center justify-between relative">
        <Heading
          title={`Sizes (${data.length})`}
          description="Define size options"
        />
        <Button
          className="text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
          size={isMobile ? "icon" : "default"}
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          {isMobile ? (
            <Plus className="h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {!isMobile && "Add New"}
        </Button>
      </div>
      <LedSeparator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Sizes" />
      <LedSeparator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
