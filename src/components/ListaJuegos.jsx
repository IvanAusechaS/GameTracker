import TarjetaJuego from "./TarjetaJuegos";



function ListaJuegos({juegos}){
    return(
        <div>
            {juegos.length > 0 ? (
                juegos.map((juego,index)=>(
                <TarjetaJuego
                key={index}
                titulo={juego.titulo}
                genero={juego.genero}
                horasJugadas={juego.horasJugadas}
                estado={juego.estado}
                />
            ))
        ) : (
            <p>No hay juegos por agregar</p>
        )}
        </div>
    );
}
export default ListaJuegos;