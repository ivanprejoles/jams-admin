import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (
      !name ||
      !price ||
      !categoryId ||
      !sizeId ||
      !colorId ||
      !salesStatus ||
      !images.length
    ) {
      return new NextResponse("All required fields must be provided", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        stock,
        categoryId,
        isFeatured,
        isArchived,
        salesStatus,
        storeId: params.storeId,
        sizes: {
          connect: sizeId.map((id: string) => ({ id })),
        },
        colors: {
          connect: colorId.map((id: string) => ({ id })),
        },
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.getAll("sizeId"); // Use getAll to support multiple size IDs
    const colorId = searchParams.getAll("colorId"); // Use getAll to support multiple color IDs
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        ...(sizeId.length && { sizes: { some: { id: { in: sizeId } } } }), // Check if sizeId exists and filter by any matching sizes
        ...(colorId.length && { colors: { some: { id: { in: colorId } } } }), // Check if colorId exists and filter by any matching colors
      },
      include: {
        images: true,
        category: true,
        sizes: true,
        colors: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
