const Task = require("../models/Task");

exports.createTask = async (req, res) => {
	try {
		const { title, description, completed } = req.body;
		const task = new Task({
			userId: req.user.id,
			title,
			description,
			completed,
		});
		await task.save();
		res.json(task);
	} catch (error) {
		console.log("Error in createTask:", error.message);
		res.status(500).json({ message: "Error creating task" });
	}
};

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ userId: req.user.id });
		res.json(tasks);
	} catch (error) {
		console.log("Error in getTasks:", error.message);
		res.status(500).json({ message: "Error fetching tasks" });
	}
};

exports.getTask = async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			userId: req.user.id,
		});
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.json(task);
	} catch (error) {
		console.log("Error in getTask:", error.message);
		res.status(500).json({ message: "Error fetching task" });
	}
};

exports.updateTask = async (req, res) => {
	try {
		const task = await Task.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			req.body,
			{ new: true }
		);
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.json(task);
	} catch (error) {
		console.log("Error in updateTask:", error.message);
		res.status(500).json({ message: "Error updating task" });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id,
		});
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.json({ message: "Task deleted" });
	} catch (error) {
		console.log("Error in deleteTask:", error.message);
		res.status(500).json({ message: "Error deleting task" });
	}
};
