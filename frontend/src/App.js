import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Calendar from './components/Calander';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState('deadline');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/task/get')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    fetch('http://localhost:5000/api/task/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
    setTasks(updatedTasks);
    fetch(`http://localhost:5000/api/task/update/${updatedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
    fetch(`http://localhost:5000/api/task/delete/${taskId}`, {
      method: 'DELETE'
    });
  };

  const sortTasks = (type) => {
    setSortType(type);
    let sortedTasks = [...tasks];
    if (type === 'priority') {
      sortedTasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setTasks(sortedTasks);
  };

  const searchTasks = (query) => {
    setSearchQuery(query);
    fetch(`http://localhost:5000/api/task/search?query=${query}`)
      .then(response => response.json())
      .then(data => setTasks(data));
  };

  return (
    <div className="App">
      <TaskForm addTask={addTask} />
      <div className="controls">
        <button onClick={() => sortTasks('deadline')}>Sort by Deadline</button>
        <button onClick={() => sortTasks('priority')}>Sort by Priority</button>
        <input type="text" placeholder="Search tasks" onChange={(e) => searchTasks(e.target.value)} />
      </div>
      <div className="main">
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        <Calendar tasks={tasks} updateTask={updateTask} />
      </div>
    </div>
  );
}

export default App;
