import { useState } from "react";
import "./App.css";

// state + logic lives inside component
function App() {
  // hooks must be inside the component
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  // functions should only be logic not ui 
  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // delete task
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // toggle function 
  // React LOVES immutable updates 
  // we dont change the value, we modify it
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
  
    setTasks(updatedTasks);
  };

  // ui lives inside return 
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Smart To-Do</h1>

      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a task..."
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.5 : 1,
            }}
          >
            {task.text}
          </span>
        
          <button
            onClick={() => deleteTask(task.id)}
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              cursor: "pointer",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "3px",
            }}
          >
            Delete
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;