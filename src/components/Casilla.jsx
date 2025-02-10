export const Casilla = ({ children, seleccionada, actualizarTablero, index }) => {
    const className = `casilla ${seleccionada ? 'seleccionada' : ''}`
  
    const handleClick = () => {
      actualizarTablero(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }
  