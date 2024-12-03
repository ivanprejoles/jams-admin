import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        sizes: true,
        colors: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      stock,
      categoryId,
      sizeId,
      colorId,
      salesStatus,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !price ||
      !categoryId ||
      !sizeId ||
      !salesStatus ||
      !colorId ||
      !images.length
    ) {
      return new NextResponse("All required fields must be provided", {
        status: 400,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        sizes: true,
        colors: true,
      },
    });

    // Step 2: Proceed with the update operation only if product is found
    if (product) {
      const updatedProduct = await prismadb.product.update({
        where: {
          id: params.productId,
        },
        data: {
          name,
          price,
          stock,
          categoryId,
          salesStatus,
          sizes: {
            disconnect: product.sizes.map((size) => ({ id: size.id })), // Disconnect old sizes
            connect: sizeId.map((id: string) => ({ id })), // Connect new sizes
          },
          colors: {
            disconnect: product.colors.map((color) => ({ id: color.id })), // Disconnect old colors
            connect: colorId.map((id: string) => ({ id })), // Connect new colors
          },
          images: {
            deleteMany: {}, // Delete all existing images
            createMany: {
              data: images.map((image: { url: string }) => image), // Add new images
            },
          },
          isFeatured,
          isArchived,
        },
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
