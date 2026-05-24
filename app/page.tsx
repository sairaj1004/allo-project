"use client";

import { useEffect, useState } from "react";

import ReservationForm from "../components/ReservationForm";
import CleanupButton from "../components/CleanupButton";
import ProductForm from "../components/ProductForm";
import InventoryForm from "../components/InventoryForm";
import InventoryChart from "../components/InventoryChart";

export default function Home() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  async function loadProducts() {
    const res = await fetch(
      "http://localhost:3000/api/products"
    );

    const data = await res.json();

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalProducts =
    filteredProducts.length;

  const totalReserved =
    filteredProducts.reduce(
      (sum: number, product: any) => {
        const inventory =
          product.inventories?.[0];

        return (
          sum +
          (inventory?.reservedStock || 0)
        );
      },
      0
    );

  const lowStock =
    filteredProducts.filter(
      (product: any) => {
        const inventory =
          product.inventories?.[0];

        if (!inventory) {
          return false;
        }

        const available =
          inventory.totalStock -
          inventory.reservedStock;

        return available < 10;
      }
    ).length;

  return (
    <div
      style={{
        padding: "40px",
        background: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Inventory Dashboard</h1>

        <CleanupButton />
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "300px",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid gray",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h3>Total Products</h3>

          <h1>{totalProducts}</h1>
        </div>

        <div
          style={{
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h3>Total Reserved</h3>

          <h1>{totalReserved}</h1>
        </div>

        <div
          style={{
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h3>Low Stock Products</h3>

          <h1>{lowStock}</h1>
        </div>
      </div>

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Low Stock Alerts
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {filteredProducts
            .filter((product: any) => {
              const inventory =
                product.inventories?.[0];

              if (!inventory) {
                return false;
              }

              const available =
                inventory.totalStock -
                inventory.reservedStock;

              return available < 10;
            })
            .map((product: any) => {
              const inventory =
                product.inventories?.[0];

              const available =
                inventory.totalStock -
                inventory.reservedStock;

              return (
                <div
                  key={product.id}
                  style={{
                    background:
                      "#2a1a1a",
                    border:
                      "1px solid #ff4d4d",
                    padding: "15px",
                    borderRadius:
                      "10px",
                    color: "#ff8080",
                    width: "400px",
                    fontWeight:
                      "bold",
                  }}
                >
                  ⚠ {product.name} only{" "}
                  {available} left
                </div>
              );
            })}
        </div>
      </div>

      <InventoryChart
        products={filteredProducts}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* PRODUCT CARDS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {filteredProducts.map(
            (product: any) => {
              const inventory =
                product.inventories?.[0];

              if (!inventory) {
                return null;
              }

              const available =
                inventory.totalStock -
                inventory.reservedStock;

              return (
                <div
                  key={product.id}
                  style={{
                    border:
                      "1px solid gray",
                    padding: "20px",
                    width: "260px",
                    borderRadius: "12px",
                    background: "#1e1e1e",
                    boxShadow:
                      "0px 0px 10px rgba(0,0,0,0.4)",
                  }}
                >
                  <h2>{product.name}</h2>

                  <p>
                    Warehouse:{" "}
                    {
                      inventory.warehouse
                        .name
                    }
                  </p>

                  <p>
                    Total Stock:{" "}
                    {
                      inventory.totalStock
                    }
                  </p>

                  <p>
                    Reserved:{" "}
                    {
                      inventory.reservedStock
                    }
                  </p>

                  <p
                    style={{
                      color:
                        available < 10
                          ? "#ff4d4d"
                          : "#4caf50",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Available:{" "}
                    {available}
                  </p>
                </div>
              );
            }
          )}
        </div>

        {/* FORMS ROW */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <ReservationForm />

          <ProductForm />

          <InventoryForm />
        </div>
      </div>
    </div>
  );
}