import React from 'react';

const Task = ({ task, goalId, updateGoalTasks, deleteTask }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => updateGoalTasks(goalId, task.id)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
};

export default Task;