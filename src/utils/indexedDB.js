import { openDB } from 'idb';

const DB_NAME = 'GoalTrackerDB';
const STORE_NAME = 'goals';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const getGoals = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addGoal = async (goal) => {
  const db = await initDB();
  await db.add(STORE_NAME, goal);
};

export const updateGoal = async (goal) => {
  const db = await initDB();
  await db.put(STORE_NAME, goal);
};

export const deleteGoal = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};