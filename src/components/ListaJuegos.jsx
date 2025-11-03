import TarjetaJuego from "./TarjetaJuegos";

function ListaJuegos({ juegos, onEditar, onEliminar }) {
    return (
        <div className="lista-juegos-container">
            {juegos.length > 0 ? (
                <div className="lista-juegos">
                    {juegos.map((juego) => (
                        <TarjetaJuego
                            key={juego._id}
                            juego={juego}
                            onEditar={onEditar}
                            onEliminar={onEliminar}
                        />
                    ))}
                </div>
            ) : (
                <div className="mensaje-vacio">
                    <p>No tienes juegos agregados</p>
                    <p className="subtitulo">Busca y agrega tus juegos favoritos</p>
                </div>
            )}
        </div>
    );
}

export default ListaJuegos;