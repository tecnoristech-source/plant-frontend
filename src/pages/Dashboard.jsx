import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);

  const [device, setDevice] = useState(null);

  const fetchDevice = async () => {
    const res = await fetch(`${API}/api/device/plant001`, {
      headers: {
        Authorization: `Bearer ${user}`
      }
    });
    const data = await res.json();
    setDevice(data);
  };

  const controlPump = async (state) => {
    await fetch(`${API}/api/device/plant001/pump`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`
      },
      body: JSON.stringify({ state })
    });
  };

  useEffect(() => {
    fetchDevice();
    const interval = setInterval(fetchDevice, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">
          Smart Irrigation Dashboard
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            {dark ? "Light" : "Dark"}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md transition">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Device: plant001
        </h2>

        <p className="mb-2 dark:text-gray-300">
          Status:{" "}
          <span
            className={`font-bold ${
              device?.status === "online"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {device?.status || "offline"}
          </span>
        </p>

        <p className="mb-2 dark:text-gray-300">
          Moisture: {device?.moisture || 0}
        </p>

        <p className="mb-6 dark:text-gray-300">
          Pump: {device?.pump || "OFF"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => controlPump("ON")}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Pump ON
          </button>

          <button
            onClick={() => controlPump("OFF")}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Pump OFF
          </button>
        </div>
      </div>
    </div>
  );
}