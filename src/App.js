import './App.css';
import ListaJuegos from './components/ListaJuegos';
import FormularioJuego from './components/FormularioJuego';
import BuscadorJuegos from './components/BuscadorJuegos';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useEffect, useState } from 'react';
import { 
  obtenerJuegos, 
  agregarJuego as agregarJuegoAPI,
  editarJuego as editarJuegoAPI,
  eliminarJuego as eliminarJuegoAPI
} from './services/juegoService';
import { verificarAutenticacion, logoutUsuario } from './services/authService';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [juegoAEditar, setJuegoAEditar] = useState(null);

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
      setJuegos([juegoGuardado, ...juegos]);
    } catch (error) {
      console.error("Hubo un error al agregar un juego", error);
      alert("Error al agregar el juego");
    }
  };

  const editarJuego = async (id, juegoActualizado) => {
    try {
      const juegoEditado = await editarJuegoAPI(id, juegoActualizado);
      setJuegos(juegos.map(j => j._id === id ? juegoEditado : j));
      setJuegoAEditar(null);
    } catch (error) {
      console.error("Error al editar juego:", error);
      alert("Error al editar el juego");
    }
  };

  const eliminarJuego = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este juego?")) {
      return;
    }

    try {
      await eliminarJuegoAPI(id);
      setJuegos(juegos.filter(j => j._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
      alert("Error al eliminar el juego");
    }
  };

  const seleccionarJuegoDesdeRAWG = (datosJuego) => {
    agregarJuego(datosJuego);
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
      setJuegoAEditar(null);
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
        <h1>🎮 GameTracker</h1>
        <div className="user-info">
          <span>Bienvenido, <strong>{usuario.nombre}</strong></span>
          <button onClick={manejarLogout} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <BuscadorJuegos onSeleccionarJuego={seleccionarJuegoDesdeRAWG} />
          <FormularioJuego 
            onAgregarJuego={agregarJuego}
            onEditarJuego={editarJuego}
            juegoAEditar={juegoAEditar}
            onCancelarEdicion={() => setJuegoAEditar(null)}
          />
        </div>

        <div className="content">
          <h2 className="section-title">
            📚 Mi Biblioteca ({juegos.length} {juegos.length === 1 ? 'juego' : 'juegos'})
          </h2>
          <ListaJuegos 
            juegos={juegos}
            onEditar={setJuegoAEditar}
            onEliminar={eliminarJuego}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
