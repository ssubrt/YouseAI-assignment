'use client';
import Appbar from '@/components/Appbar';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Define the type for Task
interface Task {
  _id: string; // MongoDB ID field
  title: string; // Task title
  description: string; // Task description
  status: string; // Task status (e.g., 'To Do', 'In Progress', 'Completed')
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]); // Type the tasks state
  const [filter, setFilter] = useState<string>('All'); // Type the filter state

  // State for new task input and current task being edited
  const [newTask, setNewTask] = useState<{ title: string; description: string; status: string; user: string }>({
    title: '',
    description: '',
    status: 'To Do',
    user: '66f69ce065055e66ea8aa8a0', // Replace with the actual user ID
  });
 
 
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Holds the ID of the task being edited 

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get('/api/tasks'); // Use axios to fetch tasks
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error); // Log any error that occurs during fetching
      }
    }
    fetchTasks();
  }, []);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => filter === 'All' ? true : task.status === filter);

  // Handle task creation
  const handleCreateTask = async () => {
    if (editingTaskId) {
      // If we are editing, update the task instead of creating a new one

      return;
    }

    try {
      const res = await axios.post('/api/tasks', {
        ...newTask,
        user: '66f69ce065055e66ea8aa8a0' // Add the user field here
      });
      setTasks((prev) => [...prev, res.data]); // Update tasks state with newly created task
      setNewTask({ title: '', description: '', status: 'To Do', user: 'userId123' }); // Reset form
    } catch (error) {
      console.error('Error creating task:', error); // Log any error that occurs during creation
    }
  };
    



  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete('/api/tasks', { data: { id } }); // Use axios to delete task
      setTasks((prev) => prev.filter((task) => task._id !== id)); // Update tasks state
    } catch (error) {
      console.error('Error deleting task:', error); // Log any error that occurs during deletion
    }
  };

 

  return (
    <div>
      <Appbar name="Tasks" />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-4 bg-gray-500 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-center mb-4">Task List</h1>
          <div className="flex flex-col mb-4">
            <input
              className="mb-2 p-2 text-white bg-gray-500 rounded"
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              className="mb-2 p-2 text-white bg-gray-500 rounded"
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingTaskId ? 'Update Task' : 'Create Task'}
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-white">Filter Tasks:</label>
            <select
              onChange={(e) => {
                const selectedValue = e.target.value;
                setFilter(selectedValue); // Set filter value
                setNewTask((prevTask) => ({ ...prevTask, status: selectedValue })); // Set status in newTask
              }}
              value={newTask.status}
              className="bg-gray-700 text-white p-2 rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <ul>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <li key={task._id} className="border-b py-2">
                  <h2 className="font-semibold">{task.title}</h2>
                  <p>{task.description}</p>
                  <p className="text-gray-500">Status: {task.status}</p>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                     className="bg-red-500 hover:bg-blue-700  text-white font-bold px-4  py-2 rounded"
                  >
                    Delete
                  </button>
                 
                </li>
              ))
            ) : (
              <p className="text-bold text-[2xl] text-center">No tasks available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
