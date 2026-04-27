import { Graph } from 'react-d3-graph';

export const NetworkGraph = ({ data }) => {
  if (!data || data.nodes.length === 0) {
    return <div style={{ padding: '20px', border: '1px dashed #555', color: '#888' }}>El grafo carece de entidades.</div>;
  }

  // Se imponen leyes físicas estrictas para evitar el colapso de los nodos
  const graphConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    height: 550,
    width: 800, // Dimensión absoluta requerida por el motor matemático de D3
    d3: {
      gravity: -350,      // Fuerza de repulsión entre nodos (evita aglomeraciones)
      linkLength: 180,    // Distancia mínima requerida entre conexiones
      linkStrength: 1     // Rigidez de la conexión
    },
    node: {
      color: '#2ecc71',
      size: 400,
      highlightStrokeColor: '#e74c3c',
      fontSize: 14,
      renderLabel: true,
      labelProperty: 'name',
      fontColor: '#e0e0e0' // Contraste adecuado para tu fondo oscuro
    },
    link: {
      highlightColor: '#e74c3c',
      strokeWidth: 2,
      color: '#555'
    }
  };

  return (
    <div style={{ border: '1px solid #333', borderRadius: '6px', background: '#1e1e1e', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Graph
        id="grafo-principal"
        data={data}
        config={graphConfig}
      />
    </div>
  );
};