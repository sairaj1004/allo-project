import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        inventories: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.reservation.deleteMany({
      where: {
        productId: body.id,
      },
    });

    await prisma.inventory.deleteMany({
      where: {
        productId: body.id,
      },
    });

    await prisma.product.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      message: "Product deleted",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}