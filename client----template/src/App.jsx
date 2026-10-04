import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
      priority: priority,
      date: new Date().toLocaleDateString(),
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
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
            {tasks.map((item, index) => (
              <li key={index}>
                <span
                  className={item.completed ? "completed-task" : ""}
                >
                  {item.text}
                </span>

                
                <small className={`priority ${item.priority.toLowerCase()}`}>
  {item.date} | Priority: {item.priority}
</small>

                <button onClick={() => completeTask(index)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => deleteTask(index)}>
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