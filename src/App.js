import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Boton from './Components/Boton.js';
import Formulario from './Components/Formulario.js';
import Menu from './Components/Menu.js';

function App() {
  return (
    <div className="App">
      <section>
        <h1>Bienvenido a Restorant</h1>
      </section>
      <section className="formulario">
        <Formulario />
      </section>
      <div>
        <Menu />
      </div>
    </div>
  
    
  );
}

export default App;
