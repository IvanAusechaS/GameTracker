import logo from './logo.svg';
import './App.css';
import TarjetaJuego from './components/TarjetaJuegos';
import ListaJuegos from './components/ListaJuegos'
import FormularioJuego from './components/FormularioJuego';
import { useState } from 'react';

function App() {
  const [juegos, setJuegos] = useState([
        {titulo: 'Fornite', genero: 'Accion', horasJugadas: 415, estado: true},
        {titulo: 'World of Wardcraft', genero: 'fantasia', horasJugadas: 59, estado: true},
        {titulo: 'Zelda', genero: 'Ficcion', horasJugadas: 0, estado: false},
    ])

    const agregarJuego = (nuevoJuego) => {
      setJuegos([...juegos, nuevoJuego])
    }
    
  return (
    <div className='app-container'>
      <FormularioJuego onAgregarJuego={agregarJuego}/>
      <ListaJuegos juegos={juegos}/>
    </div>
  );
}

export default App;
