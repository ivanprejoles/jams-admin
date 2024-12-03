import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { Image, Product } from "@prisma/client";

type ProductWithoutRelations = Omit<Product, "colors" | "sizes"> & {
  images: Image[];
  colorId: string[];
  sizeId: string[];
};

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      colors: {
        select: {
          id: true,
        },
      },
      sizes: {
        select: {
          id: true,
        },
      },
    },
  });

  let newProduct: ProductWithoutRelations | null = null;

  if (product) {
    const { colors, sizes, ...others } = product;

    newProduct = {
      ...others,
      colorId: colors.map((color: any) => color.id),
      sizeId: sizes.map((size: any) => size.id),
    };
  }

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={newProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
