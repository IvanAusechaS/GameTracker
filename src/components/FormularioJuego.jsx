import { useState } from "react";

function FormularioJuego({onAgregarJuego}){
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [horasJugadas, setHorasJugadas] = useState('');
    const [estado, setEstado] = useState(false);

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const nuevoJuego = {
            titulo,
            genero,
            horasJugadas: Number(horasJugadas) || 0,
            estado,
        }

        onAgregarJuego(nuevoJuego);
        
        // Limpiar el formulario después de agregar
        setTitulo('');
        setGenero('');
        setHorasJugadas('');
        setEstado(false);
    }

    return (
    <form className="form-juego" onSubmit={manejarEnvio}>
      <h2>Agregar nuevo juego</h2>

      <label>Título</label>
      <input
        type="text"
        placeholder="Ejemplo: Stardew Valley"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label>Género</label>
      <input
        type="text"
        placeholder="Ejemplo: Simulación"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />

      <label>Horas jugadas</label>
      <input
        type="number"
        min="0"
        placeholder="Ejemplo: 20"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <label>Completado</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value === 'true')}
      >
        <option value="false">Pendiente</option>
        <option value="true">Completado</option>
      </select>

      <button type="submit">Agregar juego</button>
    </form>
  );
}

export default FormularioJuego;