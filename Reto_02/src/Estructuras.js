export class NodoCancion { constructor(t, a) { this.titulo = t; this.artista = a; this.siguiente = null; } }
export class ListaMusica {
    constructor() { this.cabeza = null; this.cola = null; }
    agregarCancion(t, a) { const n = new NodoCancion(t, a); if (!this.cabeza) { this.cabeza = n; this.cola = n; } else { this.cola.siguiente = n; this.cola = n; } }
}
export const playlist = new ListaMusica();
playlist.agregarCancion('El Triste', 'José José');
playlist.agregarCancion('La Incondicional', 'Luis Miguel');
playlist.agregarCancion('Querida', 'Juan Gabriel');

export class NodoPagina { constructor(u) { this.url = u; this.siguiente = null; this.anterior = null; } }
export class HistorialNavegador {
    constructor() { this.actual = null; }
    visitarNuevaPagina(u) { const n = new NodoPagina(u); if (!this.actual) { this.actual = n; } else { n.anterior = this.actual; this.actual.siguiente = n; this.actual = n; } }
}
export const historial = new HistorialNavegador();
historial.visitarNuevaPagina('canvas.uao.edu.co');
historial.visitarNuevaPagina('github.com/jaguark11');
historial.visitarNuevaPagina('stackoverflow.com/questions');
historial.visitarNuevaPagina('youtube.com/lofi-hip-hop');
