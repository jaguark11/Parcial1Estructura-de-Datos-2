import { useState } from 'react';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeNode, setActiveNode] = useState<any>({ 
    data: { id: 'root', title: 'Dashboard', component: 'WelcomeView', link: '/' } 
  });

  return (
    <div className="app-container">
      <Sidebar onSelect={setActiveNode} activeId={activeNode?.data.id} />
      
      <main className="main-view">
        <div className="debug-card">
          <span className="tag">Nodo Actual: {activeNode.data.id}</span>
          
          <h1 style={{ fontSize: '36px', margin: '24px 0', color: '#fff' }}>
            Vista: {activeNode.data.title}
          </h1>
          
          <div className="code-block">
            <p><span style={{ color: '#C678DD' }}>import</span> {`{ ${activeNode.data.component} }`} <span style={{ color: '#C678DD' }}>from</span> <span style={{ color: '#98C379' }}>'./views'</span>;</p>
            <br/>
            <p><span style={{ color: '#56B6C2' }}>// Propiedad 'link' inyectada desde el árbol</span></p>
            <p><span style={{ color: '#E5C07B' }}>console</span>.log(<span style={{ color: '#98C379' }}>"{activeNode.data.link}"</span>);</p>
          </div>
        </div>
      </main>
    </div>
  );
}
