import { useState } from "react";
import { buscarJuegosRAWG } from "../services/juegoService";

function BuscadorJuegos({ onSeleccionarJuego }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const manejarBusqueda = async (e) => {
    e.preventDefault();
    
    if (!busqueda.trim()) {
      return;
    }

    setBuscando(true);
    setMostrarResultados(true);

    try {
      const juegos = await buscarJuegosRAWG(busqueda);
      setResultados(juegos);
    } catch (error) {
      console.error("Error al buscar juegos:", error);
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  };

  const seleccionarJuego = (juego) => {
    onSeleccionarJuego({
      titulo: juego.titulo,
      imagen: juego.imagen,
      descripcion: juego.descripcion || "",
      genero: juego.generos,
      plataforma: juego.plataformas,
      rating: juego.rating,
      fechaLanzamiento: juego.fechaLanzamiento,
      horasJugadas: 0,
      estado: false,
    });

    // Limpiar búsqueda
    setBusqueda("");
    setResultados([]);
    setMostrarResultados(false);
  };

  return (
    <div className="buscador-juegos">
      <h3>🔍 Buscar juegos en RAWG</h3>
      
      <form onSubmit={manejarBusqueda} className="form-busqueda">
        <input
          type="text"
          placeholder="Escribe el nombre de un juego..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <button type="submit" className="btn-buscar" disabled={buscando}>
          {buscando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {mostrarResultados && (
        <div className="resultados-busqueda">
          {buscando && <p className="mensaje-cargando">Buscando juegos...</p>}
          
          {!buscando && resultados.length === 0 && (
            <p className="mensaje-vacio">No se encontraron juegos</p>
          )}

          {!buscando && resultados.length > 0 && (
            <div className="lista-resultados">
              <p className="resultado-count">
                Se encontraron {resultados.length} juegos
              </p>
              {resultados.map((juego) => (
                <div
                  key={juego.id}
                  className="resultado-item"
                  onClick={() => seleccionarJuego(juego)}
                >
                  <div className="resultado-imagen">
                    {juego.imagen ? (
                      <img src={juego.imagen} alt={juego.titulo} />
                    ) : (
                      <div className="sin-imagen">Sin imagen</div>
                    )}
                  </div>
                  <div className="resultado-info">
                    <h4>{juego.titulo}</h4>
                    <p className="resultado-generos">{juego.generos || "Sin género"}</p>
                    <div className="resultado-detalles">
                      <span className="rating"> {juego.rating}</span>
                      <span className="fecha"> {juego.fechaLanzamiento || "N/A"}</span>
                    </div>
                    <p className="resultado-plataformas">
                      {juego.plataformas || "Sin plataformas"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BuscadorJuegos;
