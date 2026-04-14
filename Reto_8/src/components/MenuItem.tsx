export function MenuItem({ node, depth = 0, isOpen, onToggle }: any) {
  const has = node.children.length > 0;
  return (
    <div style={{ paddingLeft: `${depth * 1}rem`, color: 'white', cursor: 'pointer', padding: '10px' }}>
      <div onClick={() => has && onToggle(node.data.id)}>
        {node.data.title} {has && (isOpen ? '▼' : '▶')}
      </div>
    </div>
  );
}
