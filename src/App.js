import './App.css';
import ListaJuegos from './components/ListaJuegos'
import FormularioJuego from './components/FormularioJuego';
import { useEffect, useState } from 'react';
import { obtenerJuegos, agregarJuego as agregarJuegoAPI } from './services/juegoService';

function App() {

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    cargarJuegos();
  }, []); 

  const cargarJuegos = async () => {
    const datos = await obtenerJuegos();
    setJuegos(datos);
  }

  const agregarJuego = async (nuevoJuego) => {
    try{
        const juegoGuardado = await agregarJuegoAPI(nuevoJuego);
        setJuegos([...juegos, juegoGuardado]);
    }catch(error){
      console.error("Hubo un error al agregar un juego en APP", error)
    }
    }
    
  return (
    <div className='app-container'>
      <FormularioJuego onAgregarJuego={agregarJuego}/>
      <ListaJuegos juegos={juegos}/>
    </div>
  );
}
export default App;
