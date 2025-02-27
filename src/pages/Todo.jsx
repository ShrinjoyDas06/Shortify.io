import { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <h1 className="text-4xl font-bold text-center mb-6">✅ To-Do List</h1>

      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400/50 focus:ring-2 focus:ring-purple-400"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          ➕ Add
        </button>
      </div>

      <ul className="mt-6 space-y-2 w-full max-w-md">
        {tasks.map((t, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white/20 backdrop-blur-lg shadow-lg border border-white/30 p-3 rounded-lg"
          >
            <span className="text-lg">{t}</span>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
