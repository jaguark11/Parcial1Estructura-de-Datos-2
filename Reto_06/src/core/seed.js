export const db = [
  { id: 'u1', email: 'user@mail.com', pass: '123', name: 'Kris Developer' },
  { id: 'u2', email: 'admin@uao.edu.co', pass: 'admin', name: 'Admin Root' }
].sort((a, b) => a.id.localeCompare(b.id));
