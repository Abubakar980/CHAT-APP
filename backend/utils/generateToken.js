import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token will expire in 15 days
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Cookie is not accessible via JavaScript
        sameSite: 'Strict', // Cookie is sent only for same-site requests
    });
};

export default generateTokenAndSetCookie;