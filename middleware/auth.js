const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ message: "Access Denied" });

	try {
		const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		console.log("Error in auth middleware:", err.message);
		res.status(400).json({ message: "Invalid Token" });
	}
};

module.exports = authMiddleware;
