import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  console.log(" checkAuth triggered");

  const token = req.cookies?.jwt;
  console.log("Token:", token);

  if (!token) {
    console.log(" No token");
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    console.log("Decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log(" JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};