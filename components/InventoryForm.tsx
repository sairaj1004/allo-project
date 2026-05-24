"use client";

import {
  useEffect,
  useState,
} from "react";

export default function InventoryForm() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [productId, setProductId] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [message, setMessage] =
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

  async function createInventory() {
    const res = await fetch(
      "http://localhost:3000/api/inventory",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          productId: Number(productId),
          warehouseId: 1,
          totalStock: Number(stock),
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage(
        "Inventory added successfully"
      );

      setProductId("");
      setStock("");

      window.location.reload();
    }
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "25px",
        borderRadius: "12px",
        background: "#1e1e1e",
        width: "320px",
        border: "1px solid gray",
      }}
    >
      <h2>Add Inventory</h2>

      <select
        value={productId}
        onChange={(e) =>
          setProductId(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
        }}
      >
        <option value="">
          Select Product
        </option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Stock quantity"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={createInventory}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add Inventory
      </button>

      {message && (
        <p
          style={{
            marginTop: "15px",
            color: "#4caf50",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}