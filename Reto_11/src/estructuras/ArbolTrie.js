import { NodoTrie } from './NodoTrie.js'

export class ArbolTrie {
  constructor() {
    this.raiz = new NodoTrie()
    this.cantidadProductos = 0
    this.cantidadNodos = 1
  }

  insertar(producto) {
    const nombreNormalizado = this.normalizar(producto.name)
    let nodoActual = this.raiz

    for (const caracter of nombreNormalizado) {
      if (!nodoActual.hijos.has(caracter)) {
        nodoActual.hijos.set(caracter, new NodoTrie())
        this.cantidadNodos += 1
      }

      nodoActual = nodoActual.hijos.get(caracter)
    }

    if (!nodoActual.producto) {
      this.cantidadProductos += 1
    }

    nodoActual.producto = producto
  }

  buscarPorPrefijo(prefijo) {
    return this.buscarPorPrefijoConDetalle(prefijo).productos
  }

  buscarPorPrefijoConDetalle(prefijo) {
    const prefijoNormalizado = this.normalizar(prefijo)
    const rutaTrie = [
      {
        caracter: 'raiz',
        encontrado: true,
        parcial: '',
        profundidad: 0,
      },
    ]
    let nodoActual = this.raiz
    let nodosVisitadosPrefijo = 1
    let parcial = ''

    for (const caracter of prefijoNormalizado) {
      parcial += caracter
      const siguienteNodo = nodoActual.hijos.get(caracter)
      const encontrado = Boolean(siguienteNodo)

      rutaTrie.push({
        caracter,
        encontrado,
        parcial,
        profundidad: parcial.length,
      })

      if (!encontrado) {
        return {
          encontrado: false,
          prefijoNormalizado,
          profundidadPrefijo: prefijoNormalizado.length,
          productos: [],
          productosEncontrados: [],
          rutaTrie,
          nodosVisitadosPrefijo,
          nodosVisitadosSubarbol: 0,
          nodosVisitadosTotales: nodosVisitadosPrefijo,
        }
      }

      nodosVisitadosPrefijo += 1
      nodoActual = siguienteNodo
    }

    const productos = []
    const detalleSubarbol = {
      nodosVisitados: 0,
      productosEncontrados: [],
    }

    this.recolectarProductosConDetalle(nodoActual, productos, detalleSubarbol)

    return {
      encontrado: true,
      prefijoNormalizado,
      profundidadPrefijo: prefijoNormalizado.length,
      productos,
      productosEncontrados: detalleSubarbol.productosEncontrados,
      rutaTrie,
      nodosVisitadosPrefijo,
      nodosVisitadosSubarbol: detalleSubarbol.nodosVisitados,
      nodosVisitadosTotales:
        nodosVisitadosPrefijo + Math.max(detalleSubarbol.nodosVisitados - 1, 0),
    }
  }

  buscarNodoPrefijo(prefijo) {
    const prefijoNormalizado = this.normalizar(prefijo)
    let nodoActual = this.raiz

    for (const caracter of prefijoNormalizado) {
      if (!nodoActual.hijos.has(caracter)) {
        return null
      }

      nodoActual = nodoActual.hijos.get(caracter)
    }

    return nodoActual
  }

  recolectarProductos(nodo, productos) {
    if (nodo.producto) {
      productos.push(nodo.producto)
    }

    for (const nodoHijo of nodo.hijos.values()) {
      this.recolectarProductos(nodoHijo, productos)
    }
  }

  recolectarProductosConDetalle(nodo, productos, detalleSubarbol) {
    detalleSubarbol.nodosVisitados += 1

    if (nodo.producto) {
      productos.push(nodo.producto)
      detalleSubarbol.productosEncontrados.push({
        nombre: nodo.producto.name,
        popularidad: nodo.producto.popularity,
      })
    }

    for (const nodoHijo of nodo.hijos.values()) {
      this.recolectarProductosConDetalle(nodoHijo, productos, detalleSubarbol)
    }
  }

  normalizar(valor) {
    return String(valor).trim().toLowerCase()
  }

  insert(producto) {
    this.insertar(producto)
  }

  findByPrefix(prefijo) {
    return this.buscarPorPrefijo(prefijo)
  }

  findByPrefixWithDetails(prefijo) {
    return this.buscarPorPrefijoConDetalle(prefijo)
  }
}
