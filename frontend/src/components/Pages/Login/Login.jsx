import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext"; // 👈 import context

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext(); // 👈 use setAuthUser
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        inputs,
        { withCredentials: true }
      );

      toast.success(data.message);
      setAuthUser(data.user); // 👈 Save to context
      navigate("/"); // Go to home
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Login <span className="text-blue-400">ChatApp</span>
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <Link
            to="/signup"
            className="text-sm text-blue-400 hover:underline inline-block mt-1"
          >
            Don't have an account?
          </Link>

          <button
            type="submit"
            className="btn w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white border-0"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
