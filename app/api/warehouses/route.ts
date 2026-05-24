import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  try {
    const warehouses = await prisma.warehouse.findMany();

    return NextResponse.json(warehouses);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch warehouses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const warehouse = await prisma.warehouse.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(warehouse);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create warehouse" },
      { status: 500 }
    );
  }
}