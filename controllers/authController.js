const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		res.json({ message: "User registered successfully" });
	} catch (error) {
		console.log("Error in signup:", error.message);
		res.status(500).json({ message: "Error creating user" });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "15Mins",
		});
		res.json({ token });
	} catch (error) {
		console.log("Error in login:", error.message);
		res.status(500).json({ message: "Error logging in" });
	}
};

exports.changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		const user = await User.findById(req.user.id);
		const validPassword = await bcrypt.compare(oldPassword, user.password);

		if (!validPassword) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();
		res.json({ message: "Password changed successfully" });
	} catch (error) {
		console.log("Error in changePassword:", error.message);
		res.status(500).json({ message: "Error changing password" });
	}
};
