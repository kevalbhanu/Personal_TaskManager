import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Calendar from './Calander';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState('deadline');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem('user'))._id;
    fetch(`http://localhost:5000/api/task/get/${userid}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }}
    )
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    fetch('http://localhost:5000/api/task/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
       },
      body: JSON.stringify(task)
    });
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
    setTasks(updatedTasks);
    fetch(`http://localhost:5000/api/task/update/${updatedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' ,
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify(updatedTask)
    });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
    fetch(`http://localhost:5000/api/task/delete/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`}
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

export default Dashboard;
