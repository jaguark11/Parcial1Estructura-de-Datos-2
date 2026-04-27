import { v4 as uuidv4 } from 'uuid';

export class GraphData {
  constructor() {
    this.nodes = new Map();
    this.links = new Map(); 
    this.cityIndex = new Map();
    this.lastUpdated = new Date().toISOString();
  }

  initSeed() {
    const ciudades = [
      { id: 'c-cali', name: 'Cali', type: 'city' },
      { id: 'c-med', name: 'Medellin', type: 'city' },
      { id: 'c-bog', name: 'Bogota', type: 'city' }
    ];

    const personas = [
      { id: 'p-1', name: 'Kristian', age: 20, type: 'person', cityId: 'c-cali' },
      { id: 'p-2', name: 'Willy', age: 24, type: 'person', cityId: 'c-cali' },
      { id: 'p-3', name: 'Maria', age: 26, type: 'person', cityId: 'c-med' },
      { id: 'p-4', name: 'Messi', age: 22, type: 'person', cityId: 'c-med' },
      { id: 'p-5', name: 'Andres', age: 25, type: 'person', cityId: 'c-bog' }
    ];

    ciudades.forEach(c => this.addNode(c.id, c));
    personas.forEach(p => {
      this.addNode(p.id, p);
      this.addLink(p.id, p.cityId);
    });
    
    // Conexiones de amistad actualizadas
    this.addLink('p-1', 'p-2'); // Kristian - Willy
    this.addLink('p-1', 'p-4'); // Kristian - Messi
  }

  addNode(id, data) {
    this.nodes.set(id, { ...data, id });
    if (data.type === 'person' && data.cityId) {
      if (!this.cityIndex.has(data.cityId)) {
        this.cityIndex.set(data.cityId, new Set());
      }
      this.cityIndex.get(data.cityId).add(id);
    }
  }

  addLink(source, target) {
    const linkId = [source, target].sort().join('-');
    if (!this.links.has(linkId)) {
      this.links.set(linkId, { source, target });
    }
  }

  getPeopleByCity(cityId) {
    const ids = this.cityIndex.get(cityId) || new Set();
    return Array.from(ids)
      .map(id => this.nodes.get(id))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  exportForD3() {
    return {
      nodes: Array.from(this.nodes.values()).map(n => ({
        id: n.id,
        name: n.type === 'person' ? `${n.name} (${n.age})` : n.name,
        color: n.type === 'city' ? '#e74c3c' : '#3498db',
        size: n.type === 'city' ? 500 : 300,
        symbolType: n.type === 'city' ? 'diamond' : 'circle'
      })),
      links: Array.from(this.links.values())
    };
  }

  serialize() {
    return JSON.stringify({
      nodes: Array.from(this.nodes.entries()),
      links: Array.from(this.links.entries()),
      lastUpdated: new Date().toISOString()
    });
  }

  static deserialize(json) {
    const data = JSON.parse(json);
    const g = new GraphData();
    g.lastUpdated = data.lastUpdated;
    data.nodes.forEach(([id, val]) => g.addNode(id, val));
    data.links.forEach(([id, val]) => g.links.set(id, val));
    return g;
  }
}