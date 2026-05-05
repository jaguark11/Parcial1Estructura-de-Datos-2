import { ArbolTrie } from './ArbolTrie.js'
import { MonticuloMaximo } from './MonticuloMaximo.js'

export class MotorBusquedaInteligente {
  constructor(productos = []) {
    this.arbolTrie = new ArbolTrie()

    for (const producto of productos) {
      this.insertar(producto.name, producto.popularity)
    }
  }

  insertar(nombre, popularidad) {
    const producto = this.crearProducto(nombre, popularidad)
    this.arbolTrie.insertar(producto)
    return producto
  }

  buscarTopK(prefijo, k) {
    return this.buscarTopKConDetalle(prefijo, k).resultados
  }

  buscarTopKConDetalle(prefijo, k) {
    const inicio = obtenerTiempoActual()
    const detalleTrie = this.arbolTrie.buscarPorPrefijoConDetalle(prefijo)
    const coincidencias = detalleTrie.productos
    const monticulo = new MonticuloMaximo(compararProductosPorPopularidad)
    const resultados = []
    const limite = this.normalizarLimite(k)
    const operacionesMonticulo = []

    for (const producto of coincidencias) {
      monticulo.insertar(producto)
      operacionesMonticulo.push({
        accion: 'insertar',
        producto,
        tamanoMonticulo: monticulo.tamano(),
      })
    }

    while (resultados.length < limite && !monticulo.estaVacio()) {
      const productoExtraido = monticulo.extraerMaximo()

      resultados.push(productoExtraido)
      operacionesMonticulo.push({
        accion: 'extraerMaximo',
        producto: productoExtraido,
        tamanoMonticulo: monticulo.tamano(),
      })
    }

    const fin = obtenerTiempoActual()

    return {
      resultados,
      tiempoBusquedaMs: Number((fin - inicio).toFixed(3)),
      trie: detalleTrie,
      monticulo: {
        insertados: coincidencias.length,
        extraidos: resultados.length,
        operaciones: operacionesMonticulo,
      },
    }
  }

  obtenerCoincidencias(prefijo) {
    return this.arbolTrie.buscarPorPrefijo(prefijo)
  }

  obtenerTodosLosProductos() {
    return this.arbolTrie.buscarPorPrefijo('')
  }

  obtenerEstadisticas(prefijo = '') {
    return {
      coincidencias: this.obtenerCoincidencias(prefijo).length,
      nodos: this.arbolTrie.cantidadNodos,
      productos: this.arbolTrie.cantidadProductos,
    }
  }

  crearProducto(nombre, popularidad) {
    const nombreLimpio = String(nombre).trim()
    const popularidadNumerica = Number(popularidad)

    if (!nombreLimpio) {
      throw new Error('El nombre del producto es obligatorio')
    }

    if (!Number.isFinite(popularidadNumerica)) {
      throw new Error('La popularidad debe ser un numero')
    }

    return {
      name: nombreLimpio,
      popularity: popularidadNumerica,
    }
  }

  normalizarLimite(k) {
    const limiteNumerico = Number(k)

    if (!Number.isFinite(limiteNumerico)) {
      return 0
    }

    return Math.max(0, Math.trunc(limiteNumerico))
  }

  insert(nombre, popularidad) {
    return this.insertar(nombre, popularidad)
  }

  searchTopK(prefijo, k) {
    return this.buscarTopK(prefijo, k)
  }

  searchTopKWithDetails(prefijo, k) {
    return this.buscarTopKConDetalle(prefijo, k)
  }

  getMatches(prefijo) {
    return this.obtenerCoincidencias(prefijo)
  }

  getAllProducts() {
    return this.obtenerTodosLosProductos()
  }

  getStats(prefijo = '') {
    const estadisticas = this.obtenerEstadisticas(prefijo)

    return {
      matches: estadisticas.coincidencias,
      nodes: estadisticas.nodos,
      products: estadisticas.productos,
    }
  }
}

function compararProductosPorPopularidad(izquierda, derecha) {
  const diferenciaPopularidad = izquierda.popularity - derecha.popularity

  if (diferenciaPopularidad !== 0) {
    return diferenciaPopularidad
  }

  return derecha.name.localeCompare(izquierda.name)
}

function obtenerTiempoActual() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now()
  }

  return Date.now()
}
