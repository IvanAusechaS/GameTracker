import { useState, useEffect } from "react";

function FormularioJuego({ onAgregarJuego, onEditarJuego, juegoAEditar, onCancelarEdicion }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [genero, setGenero] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [rating, setRating] = useState(0);
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [horasJugadas, setHorasJugadas] = useState('');
    const [estado, setEstado] = useState(false);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (juegoAEditar) {
            setTitulo(juegoAEditar.titulo || '');
            setDescripcion(juegoAEditar.descripcion || '');
            setImagen(juegoAEditar.imagen || '');
            setGenero(juegoAEditar.genero || '');
            setPlataforma(juegoAEditar.plataforma || '');
            setRating(juegoAEditar.rating || 0);
            setFechaLanzamiento(juegoAEditar.fechaLanzamiento || '');
            setHorasJugadas(juegoAEditar.horasJugadas || 0);
            setEstado(juegoAEditar.estado || false);
        }
    }, [juegoAEditar]);

    const limpiarFormulario = () => {
        setTitulo('');
        setDescripcion('');
        setImagen('');
        setGenero('');
        setPlataforma('');
        setRating(0);
        setFechaLanzamiento('');
        setHorasJugadas('');
        setEstado(false);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const datosJuego = {
            titulo,
            descripcion,
            imagen,
            genero,
            plataforma,
            rating: Number(rating) || 0,
            fechaLanzamiento,
            horasJugadas: Number(horasJugadas) || 0,
            estado,
        };

        if (juegoAEditar) {
            // Modo edición
            onEditarJuego(juegoAEditar._id, datosJuego);
        } else {
            // Modo agregar
            onAgregarJuego(datosJuego);
        }

        limpiarFormulario();
    };

    const manejarCancelar = () => {
        limpiarFormulario();
        onCancelarEdicion();
    };

    return (
        <form className="form-juego" onSubmit={manejarEnvio}>
            <h2>{juegoAEditar ? ' Editar juego' : '➕ Agregar nuevo juego'}</h2>

            <label>Título *</label>
            <input
                type="text"
                placeholder="Nombre del juego"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            <label>Descripción</label>
            <textarea
                placeholder="Descripción del juego"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="3"
            />

            <label>URL de la imagen</label>
            <input
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
            />

            {imagen && (
                <div className="preview-imagen">
                    <img src={imagen} alt="Preview" />
                </div>
            )}

            <label>Género</label>
            <input
                type="text"
                placeholder="Ejemplo: Acción, RPG, Aventura"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
            />

            <label>Plataforma</label>
            <input
                type="text"
                placeholder="Ejemplo: PC, PS5, Xbox"
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
            />

            <label>Rating (0-5)</label>
            <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />

            <label>Fecha de lanzamiento</label>
            <input
                type="date"
                value={fechaLanzamiento}
                onChange={(e) => setFechaLanzamiento(e.target.value)}
            />

            <label>Horas jugadas</label>
            <input
                type="number"
                min="0"
                placeholder="20"
                value={horasJugadas}
                onChange={(e) => setHorasJugadas(e.target.value)}
            />

            <label>Estado</label>
            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value === 'true')}
            >
                <option value="false">Pendiente</option>
                <option value="true">Completado</option>
            </select>

            <div className="form-buttons">
                <button type="submit" className="btn-primary">
                    {juegoAEditar ? 'Guardar cambios' : 'Agregar juego'}
                </button>
                {juegoAEditar && (
                    <button type="button" className="btn-secondary" onClick={manejarCancelar}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

export default FormularioJuego;