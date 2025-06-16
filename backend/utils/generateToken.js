import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token will expire in 15 days
    })

    // res.cookie("jwt", token, {
    //     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    //     httpOnly: true, // Cookie is not accessible via JavaScript
    //     sameSite: 'Strict', // Cookie is sent only for same-site requests
    // });

    res.cookie("jwt", token, {
  httpOnly: true,
  secure: false, // set to true in production with HTTPS
  sameSite: "lax", // or "none" if secure is true
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
};

export default generateTokenAndSetCookie;