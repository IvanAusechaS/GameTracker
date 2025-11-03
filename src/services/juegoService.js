const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/juegos`;

/**
 * Obtener todos los juegos del usuario autenticado
 * @returns {Array} - Array de juegos
 */
export const obtenerJuegos = async () => {
    try {
        const respuesta = await fetch(API_URL, {
            credentials: "include", // Importante: incluir cookies
        });
        
        if (!respuesta.ok) {
            throw new Error("Error al obtener juegos");
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Hubo un error al traer los datos:", error);
        return [];
    }
};

/**
 * Agregar un nuevo juego
 * @param {Object} nuevoJuego - Datos del juego a agregar
 * @returns {Object} - Juego guardado
 */
export const agregarJuego = async (nuevoJuego) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoJuego),
            credentials: "include", // Importante: incluir cookies
        });
        
        if (!respuesta.ok) {
            throw new Error("Error al agregar juego");
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Hubo un error al agregar juego:", error);
        throw error;
    }
};