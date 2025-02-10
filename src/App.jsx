import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Casilla } from './components/Casilla.jsx'
import { TURNOS } from './constantes.js'
import { chequearGanador, chequearFinal } from './logic/tablero.js'
import { MenuGanador } from './components/MenuGanador.jsx'
import { guardarJuegoEnStorage, reiniciarJuegoDeStorage } from './logic/storage/index.js'

function App () {
  const [tablero, setTablero] = useState(() => {
    const tableroGuardado = window.localStorage.getItem('tablero')
    if (tableroGuardado) return JSON.parse(tableroGuardado)
    return Array(9).fill(null)
  })

  const [turno, setTurno] = useState(() => {
    const turnoGuardado = window.localStorage.getItem('turno')
    return turnoGuardado ?? TURNOS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [ganador, setGanador] = useState(null)

  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null))
    setTurno(TURNOS.X)
    setGanador(null)

    reiniciarJuegoDeStorage()
  }

  const actualizarTablero = (index) => {
    if (tablero[index] || ganador) return

    // Actualizar tablero
    const nuevoTablero = [...tablero]
    nuevoTablero[index] = turno
    setTablero(nuevoTablero)

    // Cambiar turno
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurno(nuevoTurno)

    // Guardar partida
    guardarJuegoEnStorage({
      tablero: nuevoTablero,
      turno: nuevoTurno
    })

    // Revisar si hay ganador
    const nuevoGanador = chequearGanador(nuevoTablero)
    if (nuevoGanador) {
      confetti()
      setGanador(nuevoGanador)
    } else if (chequearFinal(nuevoTablero)) {
      setGanador(false)
    }
  }

  return (
    <main className='tablero'>
      <h1>Tres En Linea</h1>
      <button onClick={reiniciarJuego}>Reiniciar Juego</button>
      <section className='juego'>
        {
          tablero.map((casilla, index) => {
            return (
              <Casilla
                key={index}
                index={index}
                actualizarTablero={actualizarTablero}
              >
                {casilla}
              </Casilla>
            )
          })
        }
      </section>

      <section className='turno'>
        <Casilla seleccionada={turno === TURNOS.X}>
          {TURNOS.X}
        </Casilla>
        <Casilla seleccionada={turno === TURNOS.O}>
          {TURNOS.O}
        </Casilla>
      </section>

      <MenuGanador reiniciarJuego={reiniciarJuego} ganador={ganador} />
    </main>
  )
}

export default App
