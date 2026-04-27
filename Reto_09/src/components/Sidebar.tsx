import { useMemo } from 'react';
import { seedFullTree } from '../core/MenuTree';
import { MenuItem } from './MenuItem';
import { useSyncedMenuState } from '../hooks/useSyncedState';

export function Sidebar({ onSelect, activeId }: any) {
  const nodes = useMemo(() => seedFullTree(), []);
  const { open, toggle } = useSyncedMenuState('colossus_menu_state');

  const render = (items: any[], d = 0) => items.map(n => (
    <div key={n.data.id}>
      <MenuItem node={n} depth={d} isOpen={open.includes(n.data.id)} onToggle={toggle} onSelect={onSelect} activeId={activeId} />
      {n.children.length > 0 && open.includes(n.data.id) && (
        <div style={{ backgroundColor: '#16181E' }}>{render(n.children, d + 1)}</div>
      )}
    </div>
  ));

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Menu Principal</div>
      {render(nodes)}
    </aside>
  );
}
