import { useState, useEffect } from "react";
import "./App.css";

// state + logic lives inside component
function App() {
  // hooks must be inside the component
  const [taskText, setTaskText] = useState("");
  // load from storage on start 
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // functions should only be logic not ui 
  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    // update tasks immutably
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // delete task
  const deleteTask = (id) => {
    // filter out the task to delete
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // toggle task completion
  // React LOVES immutable updates 
  // we dont change the value directly, we create a new object
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  };

  // save tasks to local storage
  // needs to go after state and functions
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // compute visible tasks for rendering
  // derived state based on filter
  const visibleTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  // ui lives inside return 
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Smart To-Do</h1>

      {/* controlled input */}
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={addTask}>Add</button>

      {/* filter buttons */}
      <div style={{ margin: "16px 0" }}>
        <button onClick={() => setFilter("all")} style={{ marginRight: 8 }}>All</button>
        <button onClick={() => setFilter("active")} style={{ marginRight: 8 }}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* render visibleTasks instead of tasks */}
      <ul>
        {visibleTasks.map((task) => (
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
            {/* click to toggle complete */}
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

            {/* delete button */}
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