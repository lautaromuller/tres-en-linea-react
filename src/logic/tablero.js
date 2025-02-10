import { COMBOS_GANADORES } from '../constantes.js'

export const chequearGanador = (tablero) => {
  for (const combo of COMBOS_GANADORES) {
    const [a, b, c] = combo
    if (
      tablero[a] &&
      tablero[a] === tablero[b] &&
      tablero[a] === tablero[c]
    ) {
      return tablero[a]
    }
  }
  return null
}

export const chequearFinal = (nuevoTablero) => {
  return nuevoTablero.every((casilla) => casilla !== null)
}