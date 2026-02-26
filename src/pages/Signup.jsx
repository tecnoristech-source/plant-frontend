import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-96 transition">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center dark:text-gray-300">
          Already have account?{" "}
          <Link to="/" className="text-green-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}