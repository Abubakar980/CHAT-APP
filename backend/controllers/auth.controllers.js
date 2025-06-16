import { User } from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import  generateTokenAndSetCookie  from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (!fullName?.trim() || !username?.trim() || !password || !confirmPassword || !gender) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const profilePicture =
			gender === "male"
				? `https://avatar.iran.liara.run/public/boy?username=${username}`
				: `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePicture,
		});

		await newUser.save();

		generateTokenAndSetCookie(newUser._id, res);

		res.status(201).json({
			message: "User created successfully",
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			profilePicture: newUser.profilePicture,
		});
	} catch (error) {
		console.error("Signup Error:", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};





















export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({message: "Internal server error"});  
    }
}


// continue from 52:21

