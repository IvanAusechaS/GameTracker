// URL base del backend
const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/usuarios`;

/**
 * Registrar un nuevo usuario
 * @param {Object} datosUsuario - Objeto con nombre, email y password
 * @returns {Object} - Datos del usuario registrado
 */
export const registrarUsuario = async (datosUsuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
      credentials: "include", // Importante: incluir cookies
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al registrar usuario");
    }

    return datos;
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    throw error;
  }
};

/**
 * Iniciar sesión
 * @param {Object} credenciales - Objeto con email y password
 * @returns {Object} - Datos del usuario autenticado
 */
export const loginUsuario = async (credenciales) => {
  try {
    const respuesta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
      credentials: "include", // Importante: incluir cookies
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al iniciar sesión");
    }

    return datos;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};

/**
 * Cerrar sesión
 * @returns {Object} - Mensaje de confirmación
 */
export const logoutUsuario = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Importante: incluir cookies
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al cerrar sesión");
    }

    return datos;
  } catch (error) {
    console.error("Error en logoutUsuario:", error);
    throw error;
  }
};

/**
 * Verificar si el usuario está autenticado
 * @returns {Object|null} - Datos del usuario si está autenticado, null si no
 */
export const verificarAutenticacion = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/perfil`, {
      method: "GET",
      credentials: "include", // Importante: incluir cookies
    });

    if (!respuesta.ok) {
      return null; // No está autenticado
    }

    const datos = await respuesta.json();
    return datos.usuario;
  } catch (error) {
    console.error("Error en verificarAutenticacion:", error);
    return null;
  }
};
