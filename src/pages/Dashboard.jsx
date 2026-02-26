import { useEffect, useState } from "react";

const API = "https://plant-cloud-backend.onrender.com";

export default function Dashboard() {
  const [device, setDevice] = useState(null);

  const fetchDevice = async () => {
    try {
      const res = await fetch(`${API}/api/device/plant001`);
      const data = await res.json();
      setDevice(data);
    } catch (error) {
      console.log("Server sleeping...");
    }
  };

  useEffect(() => {
    fetchDevice();
    const interval = setInterval(fetchDevice, 5000);
    return () => clearInterval(interval);
  }, []);

  const controlPump = async (state) => {
    await fetch(`${API}/api/device/plant001/pump`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Plant IoT Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Device: plant001
        </h2>

        <p className="mb-2">
          Status:{" "}
          <span
            className={`font-bold ${
              device?.status === "online"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {device?.status || "offline"}
          </span>
        </p>

        <p className="mb-2">
          Moisture: {device?.moisture || 0}
        </p>

        <p className="mb-4">
          Pump: {device?.pump || "OFF"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => controlPump("ON")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Pump ON
          </button>

          <button
            onClick={() => controlPump("OFF")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Pump OFF
          </button>
        </div>
      </div>
    </div>
  );
}