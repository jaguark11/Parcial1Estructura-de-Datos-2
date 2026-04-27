export const CityFilter = ({ cities, selectedCity, onSelect, residents }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '6px', background: '#1a1a1a', color: '#eee' }}>
      <h3 style={{ marginTop: 0 }}>Consultar Urbe</h3>
      
      <select 
        value={selectedCity} 
        onChange={(e) => onSelect(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
      >
        <option value="">-- Selecciona una ciudad --</option>
        {cities.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {selectedCity && (
        <div>
          <h4 style={{ borderBottom: '1px solid #555', paddingBottom: '8px', margin: '10px 0' }}>Habitantes registrados:</h4>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {residents.length > 0 ? (
              residents.map(p => (
                <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
                  <strong>{p.name}</strong> <span style={{ color: '#888', fontSize: '0.9em' }}>(Edad: {p.age})</span>
                </li>
              ))
            ) : (
              <li style={{ color: '#888', fontStyle: 'italic', padding: '10px 0' }}>Ningún registro encontrado.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};