"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InventoryChart({
  products,
}: {
  products: any[];
}) {
  const data = products
    .filter(
      (product: any) =>
        product.inventories?.[0]
    )
    .map((product: any) => {
      const inventory =
        product.inventories?.[0];

      const available =
        inventory.totalStock -
        inventory.reservedStock;

      return {
        name: product.name,
        available,
        reserved:
          inventory.reservedStock,
      };
    });

  return (
    <div
      style={{
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "40px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "white",
        }}
      >
        Inventory Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="available"
            fill="#4caf50"
          />

          <Bar
            dataKey="reserved"
            fill="#ff4d4d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}