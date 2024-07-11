import React from 'react';

function TaskList({ tasks, updateTask, deleteTask }) {
  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleEdit = (id) => {
    const newDescription = prompt("Enter new description:");
    const updatedTask = tasks.find(task => task._id === id);
    updatedTask.description = newDescription;
    updateTask(updatedTask);
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => handleEdit(task._id)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
