export const sortT = (t) => [...t].sort((a, b) => a.isDone !== b.isDone ? (a.isDone ? 1 : -1) : a.id.localeCompare(b.id));
export const initialTasks = sortT([
  { id: 't1', title: 'Configurar Firebase Auth', isDone: true, createdAt: '2026-03-29T10:00:00Z' },
  { id: 't2', title: 'Implementar Task Context', isDone: false, createdAt: '2026-03-29T11:00:00Z' }
]);
