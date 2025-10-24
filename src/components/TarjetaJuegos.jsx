function TarjetaJuego({titulo, genero, horasJugadas, estado }){
    return(
        <div className="card-juego">
            <img className="card-imagen" src="https://assets-prd.ignimgs.com/2023/06/09/fortnitewilds-1686353306240.jpg" alt="{`Portada de ${titulo}`}" />
            <h3 className="card-titulo">{titulo}</h3>
            <p className="card-genero">Genero: {genero}</p>
            <p className="card-horas">Horas jugadas: {horasJugadas}</p>
            <p id="card-estado">Estado: {estado ? 'Completado' : 'Pendiente'}</p>
        </div>
        
    );
}
export default TarjetaJuego;