import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const userOrders = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
                userId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                payments: {
                    select: {
                        id: true,
                        orderId: true,
                        address: true,
                        amount: true,
                        date: true,
                        email: true,
                        imageSrc: true,
                        name: true,
                        phone: true,
                        
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(userOrders);
    } catch (error) {
        console.log('[ORDERS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
