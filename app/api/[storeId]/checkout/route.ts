import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds, address, contactNumber, userId, email, name } =
      await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const order = await prismadb.order.create({
      data: {
        userId,
        email,
        name,
        storeId: params.storeId,
        isPaid: false,
        address,
        phone: contactNumber,
        orderItems: {
          create: productIds.map(
            (product: {
              id: string;
              quantity: number;
              colors: Record<string, string>;
              sizes: Record<string, string>;
            }) => ({
              product: {
                connect: {
                  id: product.id,
                },
              },
              quantity: product.quantity,
              colors: Object.values(product.colors), // Convert Record to Array
              sizes: Object.values(product.sizes), // Convert Record to Array
            })
          ),
        },
      },
      select: {
        userId: true,
        email: true,
        name: true,
        address: true,
        id: true,
        isPaid: true,
        orderItems: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            colors: true, // Include colors
            sizes: true, // Include sizes
          },
        },
        phone: true,
        createdAt: true,
      },
    });

    let newOrder = {
      ...order,
      orderItems: order.orderItems.map((order) => {
        return order.product.name;
      }),
      createAt: order.createdAt.toISOString(),
    };

    return NextResponse.json(newOrder, { headers: corsHeaders });
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
