// === TAREA 01: FUNCIONES DE ARRAY ===

let rutina = ['Pecho', 'Espalda'];

// 1. Mutación Básica
rutina.push('Pierna'); // Añade al final
rutina.unshift('Calentamiento'); // Añade al inicio
rutina.pop(); // Elimina el último ('Pierna')
rutina.shift(); // Elimina el primero ('Calentamiento')

// 2. Iteración y Transformación
const pesosKg = [60, 80, 100];
const pesosLbs = pesosKg.map(peso => peso * 2.2); // map: Transforma cada elemento
const pesosPesados = pesosKg.filter(peso => peso >= 80); // filter: Filtra bajo condición
const pesoTotalLifted = pesosKg.reduce((acc, curr) => acc + curr, 0); // reduce: Acumula valores

// 3. Búsqueda y Ordenamiento
let ejercicios = ['Dominadas', 'Remo', 'Curl Biceps'];
const tieneRemo = ejercicios.includes('Remo'); // includes: Retorna booleano
const buscarCurl = ejercicios.find(e => e.startsWith('Curl')); // find: Retorna el primer match
const indiceRemo = ejercicios.indexOf('Remo'); // indexOf: Retorna la posición
ejercicios.sort(); // sort: Ordena alfabéticamente
ejercicios.reverse(); // reverse: Invierte el orden

// 4. Modificación Avanzada
ejercicios.splice(1, 1, 'Press Militar'); // splice: Elimina/Reemplaza elementos en posición específica
const ejerciciosCore = ejercicios.slice(0, 2); // slice: Extrae una porción sin modificar el original

// 5. Recorrido
ejercicios.forEach(ejercicio => console.log('Hoy toca:', ejercicio)); // forEach: Itera sin retornar

console.log('Resultados:', { rutina, pesosLbs, pesosPesados, pesoTotalLifted, ejerciciosCore });
 
 
