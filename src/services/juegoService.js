const API_URL = "http://localhost:5000/api/juegos/";

export const obtenerJuegos = async () => {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        return datos;
    }catch(error){
        console.error("Hubo un errro al traer los datos.", error);
        return [];
    }
}

export const agregarJuego = async (nuevoJuego) => {
    try{
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoJuego), 
        });
        const datos = await respuesta.json();
        return datos;    
    }catch(error){
        console.error("Hubo un error al agregar juego.", error);
        throw error;
    }
}