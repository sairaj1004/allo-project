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
    console.log(err);

    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // CHECK IF WAREHOUSE EXISTS
    let warehouse =
      await prisma.warehouse.findFirst();

    // CREATE DEFAULT WAREHOUSE IF NONE EXISTS
    if (!warehouse) {
      warehouse =
        await prisma.warehouse.create({
          data: {
            name: "Main Warehouse",
          },
        });
    }

    const inventory =
      await prisma.inventory.create({
        data: {
          productId: Number(
            body.productId
          ),

          warehouseId:
            warehouse.id,

          totalStock: Number(
            body.totalStock
          ),
        },
      });

    return NextResponse.json(
      inventory
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Failed to create inventory" },
      { status: 500 }
    );
  }
}