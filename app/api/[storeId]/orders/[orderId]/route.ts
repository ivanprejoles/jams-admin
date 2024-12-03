import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, orderId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!params.orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const category = await prismadb.order.updateMany({
            where: {
                id: params.orderId,
            },
            data: {
                isPaid: true
            }
        });
        
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, orderId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!params.orderId) {
        return new NextResponse("Order ID is required", { status: 400 });
      }
  
      // Step 1: Delete the related OrderItems
      await prismadb.orderItem.deleteMany({
        where: {
          orderId: params.orderId,
        },
      });
  
      // Step 2: Delete the Order itself
      const order = await prismadb.order.delete({
        where: {
          id: params.orderId,
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      console.log("[ORDER_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }