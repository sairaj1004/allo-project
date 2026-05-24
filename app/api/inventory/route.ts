import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  try {
    const inventory =
      await prisma.inventory.findMany({
        include: {
          product: true,
          warehouse: true,
        },
      });

    return NextResponse.json(inventory);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inventory =
      await prisma.inventory.create({
        data: {
          productId: body.productId,
          warehouseId:
            body.warehouseId,
          totalStock:
            body.totalStock,
        },
      });

    return NextResponse.json(inventory);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Failed to create inventory" },
      { status: 500 }
    );
  }
}