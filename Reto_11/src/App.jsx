import { useMemo, useState } from 'react'
import { MotorBusquedaInteligente } from './estructuras/MotorBusquedaInteligente.js'
import './App.css'

const productosIniciales = [
  { name: 'air max', popularity: 90 },
  { name: 'air force', popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
  { name: 'apple watch', popularity: 88 },
  { name: 'air pods', popularity: 98 },
]

function App() {
  const [productos, setProductos] = useState(productosIniciales)
  const [prefijo, setPrefijo] = useState('air')
  const [cantidadTop, setCantidadTop] = useState(2)
  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState(70)
  const [mensaje, setMensaje] = useState('')

  const motorBusqueda = useMemo(
    () => new MotorBusquedaInteligente(productos),
    [productos],
  )

  const detalleBusqueda = useMemo(
    () => motorBusqueda.buscarTopKConDetalle(prefijo, cantidadTop),
    [prefijo, motorBusqueda, cantidadTop],
  )

  const resultados = detalleBusqueda.resultados
  const detalleTrie = detalleBusqueda.trie
  const detalleMonticulo = detalleBusqueda.monticulo

  const estadisticas = useMemo(
    () => motorBusqueda.obtenerEstadisticas(prefijo),
    [prefijo, motorBusqueda],
  )

  function manejarEnvio(event) {
    event.preventDefault()

    try {
      const producto = motorBusqueda.insertar(nombre, popularidad)
      setProductos((productosActuales) =>
        guardarOActualizarProducto(productosActuales, producto),
      )
      setNombre('')
      setPopularidad(70)
      setMensaje(
        `${producto.name} guardado con popularidad ${producto.popularity}`,
      )
    } catch (error) {
      setMensaje(error.message)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Reto 11</p>
          <h1>Buscador Inteligente</h1>
        </div>
        <div className="structure-tags" aria-label="Estructuras usadas">
          <span>Trie</span>
          <span>Monticulo maximo</span>
        </div>
      </header>

      <section className="workspace-grid">
        <div className="search-panel">
          <form className="search-controls">
            <label htmlFor="prefix">Prefijo</label>
            <input
              id="prefix"
              value={prefijo}
              onChange={(event) => setPrefijo(event.target.value)}
              placeholder="air"
            />

            <label htmlFor="topK">Top K</label>
            <input
              id="topK"
              min="1"
              max="10"
              type="number"
              value={cantidadTop}
              onChange={(event) => setCantidadTop(event.target.value)}
            />
          </form>

          <div className="results-header">
            <h2>Resultados</h2>
            <span>{estadisticas.coincidencias} coincidencias</span>
          </div>

          <ol className="result-list">
            {resultados.map((producto) => (
              <li key={producto.name}>
                <strong>{producto.name}</strong>
                <span>{producto.popularity}</span>
              </li>
            ))}
          </ol>

          {resultados.length === 0 && (
            <p className="empty-state">Sin productos para ese prefijo.</p>
          )}
        </div>

        <aside className="side-panel">
          <form className="insert-form" onSubmit={manejarEnvio}>
            <h2>Insertar producto</h2>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="air zoom"
            />

            <label htmlFor="popularity">Popularidad</label>
            <input
              id="popularity"
              min="0"
              type="number"
              value={popularidad}
              onChange={(event) => setPopularidad(event.target.value)}
            />

            <button type="submit">Guardar</button>
            {mensaje && <p className="form-message">{mensaje}</p>}
          </form>

          <div className="stats-grid">
            <article>
              <span>{detalleTrie.nodosVisitadosTotales}</span>
              <p>nodos visitados</p>
            </article>
            <article>
              <span>{detalleTrie.profundidadPrefijo}</span>
              <p>profundidad prefijo</p>
            </article>
            <article>
              <span>{detalleBusqueda.tiempoBusquedaMs}</span>
              <p>ms busqueda</p>
            </article>
          </div>
        </aside>
      </section>

      <section className="evidence-grid">
        <article className="trace-card">
          <div className="results-header">
            <h2>Recorrido Trie</h2>
            <span>{estadisticas.nodos} nodos totales</span>
          </div>

          <div className="trie-path">
            {detalleTrie.rutaTrie.map((paso) => (
              <span
                className={paso.encontrado ? 'path-node' : 'path-node missing'}
                key={`${paso.profundidad}-${paso.parcial || 'raiz'}`}
                title={paso.parcial || 'raiz'}
              >
                {paso.caracter}
              </span>
            ))}
          </div>

          <div className="metric-strip">
            <span>prefijo: {detalleTrie.prefijoNormalizado || '(vacio)'}</span>
            <span>subarbol: {detalleTrie.nodosVisitadosSubarbol} nodos</span>
            <span>productos: {detalleTrie.productos.length}</span>
          </div>
        </article>

        <article className="trace-card">
          <div className="results-header">
            <h2>Monticulo Maximo</h2>
            <span>{detalleMonticulo.insertados} insertados</span>
          </div>

          <div className="heap-steps">
            {detalleMonticulo.operaciones.map((operacion, indice) => (
              <div className="heap-step" key={`${operacion.accion}-${indice}`}>
                <span>{indice + 1}</span>
                <strong>{operacion.accion}</strong>
                <p>
                  {operacion.producto.name} ({operacion.producto.popularity})
                </p>
                <small>tamaño: {operacion.tamanoMonticulo}</small>
              </div>
            ))}
          </div>

          {detalleMonticulo.operaciones.length === 0 && (
            <p className="empty-state">Sin operaciones: no hubo coincidencias.</p>
          )}
        </article>
      </section>

      <section className="catalog-section">
        <div className="results-header">
          <h2>Catalogo</h2>
          <span>{productos.length} registros</span>
        </div>
        <div className="catalog-table">
          {productos.map((producto) => (
            <div className="catalog-row" key={producto.name}>
              <span>{producto.name}</span>
              <strong>{producto.popularity}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function guardarOActualizarProducto(productos, producto) {
  const nombreNormalizado = producto.name.trim().toLowerCase()
  const productosActualizados = []
  let fueActualizado = false

  for (const productoActual of productos) {
    if (productoActual.name.trim().toLowerCase() === nombreNormalizado) {
      productosActualizados.push(producto)
      fueActualizado = true
    } else {
      productosActualizados.push(productoActual)
    }
  }

  if (!fueActualizado) {
    productosActualizados.push(producto)
  }

  return productosActualizados
}

export default App
