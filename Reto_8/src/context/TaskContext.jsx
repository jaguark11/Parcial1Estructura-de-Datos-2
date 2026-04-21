import { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks, sortT } from '../core/seed.js';
const TaskCtx = createContext();
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks_v7')) || initialTasks);
  useEffect(() => { localStorage.setItem('tasks_v7', JSON.stringify(tasks)); }, [tasks]);
  const add = (title) => setTasks(prev => sortT([...prev, { id: `t_${Date.now()}`, title, isDone: false }]));
  const toggle = (id) => setTasks(prev => sortT(prev.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t)));
  const del = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const edit = (id, title) => setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
  return <TaskCtx.Provider value={{ tasks, add, toggle, del, edit }}>{children}</TaskCtx.Provider>;
};
export const useTasks = () => useContext(TaskCtx);
