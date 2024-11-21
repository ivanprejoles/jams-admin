import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import ClientForm from "@/components/client-form";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col relative">
      <ClientForm>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorClient data={formattedColors} />
        </div>
      </ClientForm>
    </div>
  );
};

export default ColorsPage;
