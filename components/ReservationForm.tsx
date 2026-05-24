"use client";

import { useEffect, useState } from "react";

export default function ReservationForm() {
  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  async function createReservation() {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "http://localhost:3000/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId: Number(productId),
            warehouseId: 1,
            quantity: Number(quantity),
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(
          "Reservation created successfully"
        );

        setProductId("");
        setQuantity("");

        window.location.reload();
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "12px",
        background: "#1e1e1e",
        width: "320px",
        border: "1px solid gray",
      }}
    >
      <h2>Create Reservation</h2>

      <select
        value={productId}
        onChange={(e) =>
          setProductId(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
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
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={createReservation}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading
          ? "Creating..."
          : "Reserve Stock"}
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