import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs.fullName ||
      !inputs.username ||
      !inputs.password ||
      !inputs.confirmPassword ||
      !inputs.gender
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (inputs.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/signup",
        inputs,
        { withCredentials: true }
      );
      toast.success(data.message);
      navigate("/login"); // Redirect to login
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Sign Up <span className="text-blue-400">ChatApp</span>
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm text-blue-400 hover:underline inline-block mt-1"
          >
            Already have an account?
          </Link>

          <button
            type="submit"
            className="btn w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white border-0"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
