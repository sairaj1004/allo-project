"use client";

import { useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [message, setMessage] =
    useState("");

  async function createProduct() {
    const res = await fetch(
      "http://localhost:3000/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage(
        "Product created successfully"
      );

      setName("");

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
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={createProduct}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add Product
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