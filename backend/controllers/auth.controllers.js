import { User } from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
       }

       const user = await User.findOne({username});

       if(user) {
            return res.status(400).json({message: "Username already exists"});
       }

       // HASH Password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
         if(!hashedPassword) {
                return res.status(500).json({message: "Error hashing password"});
         } 
       // Avatar

       const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
       const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

       const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();
            
            return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePicture: newUser.profilePicture,
            message: "User created successfully", user: newUser
        });
        } else {
            return res.status(500).json({message: "Invalid User Data"});
        }

       
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({message: "Internal server error"});  
    }


}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");

        if(!username || !password) {
            return res.status(400).json({message: "Username and password are required"});
        }
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
            message: "Login successful",
            user
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({message: "Internal server error"});  
    }
}

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

