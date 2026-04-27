import { ChevronDown, ChevronRight } from 'lucide-react';

export function MenuItem({ node, depth = 0, isOpen, onToggle, onSelect, activeId }: any) {
  const has = node.children.length > 0;
  const isActive = activeId === node.data.id;
  
  return (
    <div 
      className={`menu-item ${isActive && !has ? 'active' : ''}`}
      style={{ paddingLeft: `${depth * 20 + 16}px` }}
      onClick={() => { 
        if(has) onToggle(node.data.id); 
        onSelect(node); 
      }}
    >
      <span>{node.data.title}</span>
      {has && (isOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>)}
    </div>
  );
}
