import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px 40px",
        background: "#1e1e1e",
        borderBottom: "1px solid gray",
      }}
    >
      <Link
        href="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </Link>

      <Link
        href="/reservations"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Reservations
      </Link>
    </div>
  );
}