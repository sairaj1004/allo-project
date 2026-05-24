import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inventory = await prisma.inventory.findFirst({
      where: {
        productId: body.productId,
        warehouseId: body.warehouseId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    const availableStock =
      inventory.totalStock - inventory.reservedStock;

    if (body.quantity > availableStock) {
      return NextResponse.json(
        { error: "Not enough stock available" },
        { status: 400 }
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        reservedStock:
          inventory.reservedStock + body.quantity,
      },
    });

    const reservation = await prisma.reservation.create({
      data: {
        productId: body.productId,
        warehouseId: body.warehouseId,
        quantity: body.quantity,
        status: "reserved",

        expiresAt: new Date(
          Date.now() + 15 * 60 * 1000
        ),
      },
    });

    return NextResponse.json(reservation);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Reservation failed" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const reservations =
      await prisma.reservation.findMany({
        include: {
          product: true,
        },
      });

    return NextResponse.json(
      reservations
    );
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch reservations",
      },
      { status: 500 }
    );
  }
}