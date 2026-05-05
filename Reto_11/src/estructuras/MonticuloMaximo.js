export class MonticuloMaximo {
  constructor(comparar = compararPorDefecto) {
    this.elementos = []
    this.comparar = comparar
  }

  insertar(elemento) {
    this.elementos.push(elemento)
    this.subir(this.elementos.length - 1)
  }

  extraerMaximo() {
    if (this.estaVacio()) {
      return null
    }

    if (this.elementos.length === 1) {
      return this.elementos.pop()
    }

    const elementoMaximo = this.elementos[0]
    this.elementos[0] = this.elementos.pop()
    this.bajar(0)

    return elementoMaximo
  }

  estaVacio() {
    return this.elementos.length === 0
  }

  tamano() {
    return this.elementos.length
  }

  subir(indice) {
    let indiceHijo = indice

    while (indiceHijo > 0) {
      const indicePadre = Math.floor((indiceHijo - 1) / 2)

      if (
        this.tieneMayorPrioridad(
          this.elementos[indicePadre],
          this.elementos[indiceHijo],
        )
      ) {
        break
      }

      this.intercambiar(indicePadre, indiceHijo)
      indiceHijo = indicePadre
    }
  }

  bajar(indice) {
    let indicePadre = indice

    while (true) {
      const indiceHijoIzquierdo = indicePadre * 2 + 1
      const indiceHijoDerecho = indicePadre * 2 + 2
      let indiceMayorPrioridad = indicePadre

      if (
        indiceHijoIzquierdo < this.elementos.length &&
        this.tieneMayorPrioridad(
          this.elementos[indiceHijoIzquierdo],
          this.elementos[indiceMayorPrioridad],
        )
      ) {
        indiceMayorPrioridad = indiceHijoIzquierdo
      }

      if (
        indiceHijoDerecho < this.elementos.length &&
        this.tieneMayorPrioridad(
          this.elementos[indiceHijoDerecho],
          this.elementos[indiceMayorPrioridad],
        )
      ) {
        indiceMayorPrioridad = indiceHijoDerecho
      }

      if (indiceMayorPrioridad === indicePadre) {
        break
      }

      this.intercambiar(indicePadre, indiceMayorPrioridad)
      indicePadre = indiceMayorPrioridad
    }
  }

  tieneMayorPrioridad(izquierda, derecha) {
    return this.comparar(izquierda, derecha) > 0
  }

  intercambiar(indiceIzquierdo, indiceDerecho) {
    const elementoTemporal = this.elementos[indiceIzquierdo]
    this.elementos[indiceIzquierdo] = this.elementos[indiceDerecho]
    this.elementos[indiceDerecho] = elementoTemporal
  }

  insert(elemento) {
    this.insertar(elemento)
  }

  extractMax() {
    return this.extraerMaximo()
  }

  isEmpty() {
    return this.estaVacio()
  }

  size() {
    return this.tamano()
  }
}

function compararPorDefecto(izquierda, derecha) {
  return izquierda - derecha
}
