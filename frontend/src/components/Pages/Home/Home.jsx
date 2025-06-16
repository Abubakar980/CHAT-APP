import MessageContainer from "../Messages/MessageContainer";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext"; // 👈 import context

const Home = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext(); // 👈 use context

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });

      localStorage.removeItem("chat-user");     // clear from localStorage
      setAuthUser(null);                        // clear from context
      toast.success("Logged out successfully");
      navigate("/signup");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen px-4">
      <button
        onClick={handleLogout}
        className="self-end mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Logout
      </button>

      <div className="flex sm:h-[450px] md:h-[550px] w-full max-w-6xl mx-auto
                      rounded-lg overflow-hidden
                      bg-white/10 backdrop-blur-md border border-white/20">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
