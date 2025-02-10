import { Casilla} from './Casilla.jsx'

export function MenuGanador ({ ganador, reiniciarJuego }) {
  if (ganador === null) return null

  const textoGanador = ganador === false ? 'Empate' : 'Ganó:'

  return (
    <section className='menu-ganador'>
      <div className='texto'>
        <h2>{textoGanador}</h2>

        <header className='ganador'>
          {ganador ? <Casilla>{ganador}</Casilla> : <Casilla>🤝🏼</Casilla> }
        </header>

        <footer>
          <button onClick={reiniciarJuego}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
