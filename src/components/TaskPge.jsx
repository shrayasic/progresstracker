import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Goal from './Goal';
import { getGoals, updateGoal } from '../utils/indexedDB';

const TaskPage = () => {
  const { goalId } = useParams();
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      const storedGoals = await getGoals();
      const foundGoal = storedGoals.find((g) => g.id === goalId);
      setGoals(storedGoals);
      setCurrentGoal(foundGoal);
    };
    fetchGoals();
  }, [goalId]);

  const updateGoalTasks = async (goalId, updatedTasks) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, tasks: updatedTasks } : goal
    );
    setGoals(updatedGoals);
    setCurrentGoal({ ...currentGoal, tasks: updatedTasks });
    await updateGoal({ ...currentGoal, tasks: updatedTasks }); 
  };

  if (!currentGoal) return <div>Goal not found!</div>;

  return (
    <div className="p-4">
      <Goal goal={currentGoal} updateGoalTasks={updateGoalTasks} />
    </div>
  );
};

export default TaskPage;