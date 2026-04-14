import { useState, useEffect } from 'react';
export function useSyncedMenuState(key: string) {
  const [open, setOpen] = useState<string[]>(() => JSON.parse(localStorage.getItem(key) || '[]'));
  const toggle = (id: string) => {
    setOpen(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };
  return { open, toggle };
}
