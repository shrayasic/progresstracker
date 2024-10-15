import React, { useState } from 'react';
import Task from './task';

const Goal = ({ goal, updateGoalTasks }) => {
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      const updatedTasks = [...goal.tasks, newTask];
      updateGoalTasks(goal.id, updatedTasks);
      setTaskText(''); // Clear input field after adding task
    }
  };

  const toggleTaskCompletion = (goalId, taskId) => {
    const updatedTasks = goal.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateGoalTasks(goalId, updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = goal.tasks.filter((task) => task.id !== taskId);
    updateGoalTasks(goal.id, updatedTasks);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border rounded px-4 py-2 flex-1"
            placeholder="Enter new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
        <div className="mt-4">
          {goal.tasks.length > 0 ? (
            goal.tasks.map((task) => (
              <Task key={task.id} task={task} goalId={goal.id} updateGoalTasks={toggleTaskCompletion} deleteTask={deleteTask} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goal;