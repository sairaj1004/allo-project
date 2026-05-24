import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function POST() {
  try {
    const expiredReservations =
      await prisma.reservation.findMany({
        where: {
          status: "reserved",
          expiresAt: {
            lt: new Date(),
          },
        },
      });

    for (const reservation of expiredReservations) {
      const inventory =
        await prisma.inventory.findFirst({
          where: {
            productId:
              reservation.productId,
            warehouseId:
              reservation.warehouseId,
          },
        });

      if (inventory) {
        await prisma.inventory.update({
          where: {
            id: inventory.id,
          },
          data: {
            reservedStock:
              inventory.reservedStock -
              reservation.quantity,
          },
        });
      }

      await prisma.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: "expired",
        },
      });
    }

    return NextResponse.json({
      message: "Cleanup completed",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}