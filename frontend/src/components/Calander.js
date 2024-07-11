import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar({ tasks, updateTask }) {
  const handleDateClick = (date) => {
    const taskDescriptions = tasks
      .filter(task => new Date(task.deadline).toDateString() === date.toDateString())
      .map(task => task.description)
      .join("\n");
    alert(taskDescriptions || "No tasks for this date.");
  };

  const tileContent = ({ date }) => {
    const dayTasks = tasks.filter(task => new Date(task.deadline).toDateString() === date.toDateString());
    return dayTasks.length > 0 ? <span className="dot"></span> : null;
  };

  return (
    <ReactCalendar
      onClickDay={handleDateClick}
      tileContent={tileContent}
    />
  );
}

export default Calendar;
