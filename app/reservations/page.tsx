import Countdown from "../../components/Countdown";

async function getReservations() {
  const res = await fetch(
    "http://localhost:3000/api/reservations",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function ReservationsPage() {
  const reservations =
    await getReservations();

  return (
    <div
      style={{
        padding: "40px",
        background: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>Reservation History</h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#1e1e1e",
            }}
          >
            <th
              style={{
                padding: "15px",
                border: "1px solid gray",
              }}
            >
              Product
            </th>

            <th
              style={{
                padding: "15px",
                border: "1px solid gray",
              }}
            >
              Quantity
            </th>

            <th
              style={{
                padding: "15px",
                border: "1px solid gray",
              }}
            >
              Status
            </th>

            <th
              style={{
                padding: "15px",
                border: "1px solid gray",
              }}
            >
              Expires At
            </th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(
            (reservation: any) => (
              <tr key={reservation.id}>
                <td
                  style={{
                    padding: "15px",
                    border:
                      "1px solid gray",
                  }}
                >
                  {
                    reservation.product
                      .name
                  }
                </td>

                <td
                  style={{
                    padding: "15px",
                    border:
                      "1px solid gray",
                  }}
                >
                  {reservation.quantity}
                </td>

                <td
                  style={{
                    padding: "15px",
                    border:
                      "1px solid gray",
                  }}
                >
                  <span
                    style={{
                      color:
                        reservation.status ===
                        "reserved"
                          ? "#4caf50"
                          : "#ff4d4d",
                      fontWeight: "bold",
                    }}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "15px",
                    border:
                      "1px solid gray",
                  }}
                >
                  <Countdown
                    expiresAt={
                      reservation.expiresAt
                    }
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}