function TarjetaJuego({ juego, onEditar, onEliminar }) {
    const imagenPorDefecto = "https://placehold.co/300x400/e0e0e0/666?text=Sin+Imagen";

    return (
        <div className="card-juego">
            <div className="card-imagen-container">
                <img 
                    className="card-imagen" 
                    src={juego.imagen || imagenPorDefecto} 
                    alt={juego.titulo}
                    onError={(e) => e.target.src = imagenPorDefecto}
                />
                {juego.estado && <span className="badge-completado">✓ Completado</span>}
            </div>
            
            <div className="card-contenido">
                <h3 className="card-titulo">{juego.titulo}</h3>
                
                {juego.descripcion && (
                    <p className="card-descripcion">
                        {juego.descripcion.substring(0, 100)}
                        {juego.descripcion.length > 100 ? "..." : ""}
                    </p>
                )}

                <div className="card-info">
                    {juego.genero && (
                        <p className="card-genero">
                            <span className="icon"></span> {juego.genero}
                        </p>
                    )}
                    
                    {juego.plataforma && (
                        <p className="card-plataforma">
                            <span className="icon"></span> {juego.plataforma}
                        </p>
                    )}

                    {juego.rating > 0 && (
                        <p className="card-rating">
                            <span className="icon"></span> {juego.rating}/5
                        </p>
                    )}

                    {juego.fechaLanzamiento && (
                        <p className="card-fecha">
                            <span className="icon"></span> {new Date(juego.fechaLanzamiento).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    )}

                    <p className="card-horas">
                        <span className="icon"></span> {juego.horasJugadas}h jugadas
                    </p>
                </div>

                <div className="card-acciones">
                    <button 
                        className="btn-editar" 
                        onClick={() => onEditar(juego)}
                        title="Editar juego"
                    >
                         Editar
                    </button>
                    <button 
                        className="btn-eliminar" 
                        onClick={() => onEliminar(juego._id)}
                        title="Eliminar juego"
                    >
                         Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TarjetaJuego;