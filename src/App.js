import './App.css';
import ListaJuegos from './components/ListaJuegos';
import FormularioJuego from './components/FormularioJuego';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useEffect, useState } from 'react';
import { obtenerJuegos, agregarJuego as agregarJuegoAPI } from './services/juegoService';
import { verificarAutenticacion, logoutUsuario } from './services/authService';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    verificarAuth();
  }, []); 

  // Cargar juegos cuando el usuario esté autenticado
  useEffect(() => {
    if (usuario) {
      cargarJuegos();
    }
  }, [usuario]);

  const verificarAuth = async () => {
    const usuarioAutenticado = await verificarAutenticacion();
    setUsuario(usuarioAutenticado);
    setCargandoAuth(false);
  };

  const cargarJuegos = async () => {
    try {
      const datos = await obtenerJuegos();
      setJuegos(datos);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    }
  };

  const agregarJuego = async (nuevoJuego) => {
    try {
      const juegoGuardado = await agregarJuegoAPI(nuevoJuego);
      setJuegos([...juegos, juegoGuardado]);
    } catch (error) {
      console.error("Hubo un error al agregar un juego", error);
    }
  };

  const manejarLoginExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarRegistroExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarLogout = async () => {
    try {
      await logoutUsuario();
      setUsuario(null);
      setJuegos([]);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Mostrar loader mientras se verifica la autenticación
  if (cargandoAuth) {
    return (
      <div className="app-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, mostrar formularios de login/registro
  if (!usuario) {
    return (
      <div className="app-container">
        {mostrarRegistro ? (
          <RegisterForm
            onRegistroExitoso={manejarRegistroExitoso}
            onCambiarALogin={() => setMostrarRegistro(false)}
          />
        ) : (
          <LoginForm
            onLoginExitoso={manejarLoginExitoso}
            onCambiarARegistro={() => setMostrarRegistro(true)}
          />
        )}
      </div>
    );
  }

  // Si está autenticado, mostrar la aplicación principal
  return (
    <div className='app-container'>
      <header className="app-header">
        <h1>GameTracker</h1>
        <div className="user-info">
          <span>Bienvenido, {usuario.nombre}</span>
          <button onClick={manejarLogout} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </header>
      <FormularioJuego onAgregarJuego={agregarJuego}/>
      <ListaJuegos juegos={juegos}/>
    </div>
  );
}

export default App;
