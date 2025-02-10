export const guardarJuegoEnStorage = ({ tablero, turno }) => {
    window.localStorage.setItem('tablero', JSON.stringify(tablero))
    window.localStorage.setItem('turno', turno)
  }
  
  export const reiniciarJuegoDeStorage = () => {
    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
  }
  