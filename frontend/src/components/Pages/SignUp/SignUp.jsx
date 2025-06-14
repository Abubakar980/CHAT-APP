import GenderCheckbox from "./GenderCheckbox";


const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md
                      bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up <span className="text-blue-400">ChatApp</span>
        </h1>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="input input-bordered w-full 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <GenderCheckbox />

          <div className="text-sm text-right">
            <a href="#" className="text-blue-400 hover:underline">
              Already have an account?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white border-0"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

