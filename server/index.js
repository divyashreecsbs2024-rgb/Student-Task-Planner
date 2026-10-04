const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
    res.send("Student Task Planner Server is running!");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        text: req.body.text,
        completed: false,
        priority: req.body.priority || "Medium",
        date: req.body.date || new Date().toLocaleDateString()
    };

    tasks.push(task);
    res.json(task);
});

app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = req.body.completed;
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id !== Number(req.params.id));
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});