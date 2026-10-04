import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
const API = "http://localhost:5000/tasks";
const [tasks, setTasks] = useState([]);

useEffect(() => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.log(err));
}, []);

const addTask = async () => {
  if (task.trim() === "") return;
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: task,
      priority: priority,
      date: new Date().toLocaleDateString(),
    }),
  });
  const saved = await res.json();
  setTasks([...tasks, saved]);
  setTask("");
};

const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  setTasks(tasks.filter((t) => t._id !== id));
};

const completeTask = async (id) => {
  const current = tasks.find((t) => t._id === id);
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !current.completed }),
  });
  const updated = await res.json();
  setTasks(tasks.map((t) => (t._id === id ? updated : t)));
};

  return (
    <div className="app">
      <div className="planner">
        <h1>Student Task Planner</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <h2>My Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <ul>
            {tasks.map((item) => (
              <li key={item._id}>
                <span
                  className={item.completed ? "completed-task" : ""}
                >
                  {item.text}
                </span>

                
                <small className={`priority ${item.priority.toLowerCase()}`}>
  {item.date} | Priority: {item.priority}
</small>

                <button onClick={() => completeTask(item._id)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => deleteTask(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;