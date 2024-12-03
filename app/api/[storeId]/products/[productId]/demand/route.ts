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
        status
      } = body;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (
        !status
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
            id: true
        }
      });
  
      // Step 2: Proceed with the update operation only if product is found
      if (product) {
        const updatedProduct = await prismadb.product.update({
          where: {
            id: params.productId,
          },
          data: {
            salesStatus: status
          },
        });
      }
  
      return NextResponse.json(product);
    } catch (error) {
      console.log("[STATUS_PATCH]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }