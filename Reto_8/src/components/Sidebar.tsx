import { useMemo } from 'react';
import { seedSystemTree } from '../core/MenuTree';
import { MenuItem } from './MenuItem';
import { useSyncedMenuState } from '../hooks/useSyncedState';
export function Sidebar() {
  const nodes = useMemo(() => seedSystemTree(), []);
  const { open, toggle } = useSyncedMenuState('menu_state');
  const render = (items: any[], d = 0) => items.map(n => (
    <div key={n.data.id}>
      <MenuItem node={n} depth={d} isOpen={open.includes(n.data.id)} onToggle={toggle} />
      {n.children.length > 0 && open.includes(n.data.id) && render(n.children, d + 1)}
    </div>
  ));
  return <aside style={{ width: '250px', height: '100vh', background: '#111' }}>{render(nodes)}</aside>;
}
