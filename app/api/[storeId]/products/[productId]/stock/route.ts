import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();
  
      const {
        value
      } = body;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (
        !value
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
        select: {
            stock: true
        }
      });
  
      // Step 2: Proceed with the update operation only if product is found
      if (product) {
        const updatedProduct = await prismadb.product.update({
          where: {
            id: params.productId,
          },
          data: {
            stock: product.stock + value
          },
        });
      }
  
      return NextResponse.json(product);
    } catch (error) {
      console.log("[STOCK_PATCH]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }