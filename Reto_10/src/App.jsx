import { useEffect, useState, useMemo } from 'react';
import { GraphData } from './core/GraphData';
import { NetworkGraph } from './components/NetworkGraph';
import { CityFilter } from './components/CityFilter';

// Cambiamos la llave a v2 para forzar el refresco de los datos
const SYNC_KEY = 'reto10_grafo_estado_v2';

function App() {
  const [grafo, setGrafo] = useState(() => {
    const guardado = localStorage.getItem(SYNC_KEY);
    if (guardado) return GraphData.deserialize(guardado);
    
    const instancia = new GraphData();
    instancia.initSeed();
    localStorage.setItem(SYNC_KEY, instancia.serialize());
    return instancia;
  });

  const [ciudadFiltro, setCiudadFiltro] = useState('');

  useEffect(() => {
    const handleSync = (e) => {
      if (e.key === SYNC_KEY && e.newValue) {
        const grafoRemoto = GraphData.deserialize(e.newValue);
        if (grafoRemoto.lastUpdated > grafo.lastUpdated) {
          setGrafo(grafoRemoto);
        }
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, [grafo.lastUpdated]);

  const ciudades = useMemo(() => {
    return Array.from(grafo.nodes.values()).filter(n => n.type === 'city');
  }, [grafo]);

  const residentes = useMemo(() => {
    return ciudadFiltro ? grafo.getPeopleByCity(ciudadFiltro) : [];
  }, [ciudadFiltro, grafo]);

  return (
    <div style={{ padding: '2vw', fontFamily: 'sans-serif', color: '#e0e0e0', background: '#121212', minHeight: '100vh' }}>
      <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>Challenge 10: Grafo Relacional</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '25px', marginTop: '25px' }}>
        <NetworkGraph data={grafo.exportForD3()} />
        <CityFilter 
          cities={ciudades} 
          selectedCity={ciudadFiltro} 
          onSelect={setCiudadFiltro} 
          residents={residentes} 
        />
      </div>
    </div>
  );
}

export default App;