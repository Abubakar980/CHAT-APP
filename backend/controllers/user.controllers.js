import { User } from "../models/auth.models.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user; // Assuming req.user is set by a middleware after authentication
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error fetching user for sidebar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}