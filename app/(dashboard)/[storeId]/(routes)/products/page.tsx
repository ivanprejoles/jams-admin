import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import ClientForm from "@/components/client-form";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    stock: (item.stock).toString(),
    category: item.category.name,
    sizes: item.sizes.map((size) => size.name),
    colors: item.colors.map((color) => color.value),
    salesCount: item.salesCount,
    salesStatus: item.salesStatus,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col relative">
      <ClientForm>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formattedProducts} />
        </div>
      </ClientForm>
    </div>
  );
};

export default ProductsPage;
