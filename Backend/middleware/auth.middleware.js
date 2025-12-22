const jwt = require("jsonwebtoken");

 function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded payload to req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    console.log("Auth middleware passed.");
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
module.exports = {authMiddleware}


