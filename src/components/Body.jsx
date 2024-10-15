import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addGoal, getGoals, deleteGoal as removeGoal } from '../utils/indexedDB';

const Body = () => {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      const storedGoals = await getGoals();
      setGoals(storedGoals);
    };
    fetchGoals();
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addNewGoal = async () => {
    if (goalInput.trim()) {
      const newGoal = {
        id: generateId(),
        title: goalInput,
        tasks: [],
      };
      await addGoal(newGoal);
      setGoals([...goals, newGoal]);
      setGoalInput('');
    }
  };

  const deleteGoal = async (id) => {
    await removeGoal(id);
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateCompletionPercentage = (tasks) => {
    // Check if tasks is an array
    if (!Array.isArray(tasks)) {
      console.error('Expected tasks to be an array but got:', tasks);
      return 0; // Return 0 if tasks is not an array
    }
  
    if (tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Goal</h2>
      <div className="mb-4">
        <input
          type="text"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter your goal"
        />
        <button
          onClick={addNewGoal}
          className="bg-blue-500 text-white p-2 mt-2 rounded w-full"
        >
          Create Goal
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border p-4 rounded bg-gray-100">
            <Link to={`/goal/${goal.id}`}>
              <h3 className="text-xl font-bold">{goal.title}</h3>
            </Link>
            <p>{calculateCompletionPercentage(goal.tasks)}% completed</p>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete Goal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
