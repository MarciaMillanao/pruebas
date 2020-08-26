import React from 'react';
import Boton from './Boton.js';
import '../style/formulario.css';

class Formulario extends React.Component {
  render() {
    return <form>
      <input type="text" placeholder="Ingresa tu Nombre" className="input-form"></input>
      <input type="email" placeholder="Ingresa tu Email" className="input-form"></input>
      <input type="password" placeholder="Ingresa tu Contraseña" className="input-form"></input>
      <Boton nombre="Ingresar"/>
    </form>
  }
}

export default Formulario