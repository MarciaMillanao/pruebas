import React from 'react';
import data from '../data';
//import Data from '../data.js';
//import Data from '../data.js';
//import { element } from 'prop-types';

const datosDesayuno = data.desayuno;
const datosAlmuerzo = data.almuerzo;
class Menu extends React.Component {
  
  render() {
    return <div>
      <div>
        <h4>Desayuno</h4>
        {
          datosDesayuno.map((element, index) => (
          <button type="submit" key={index}>{element.product} {element.valor}</button>
          ))
        }
      </div>
      <div>
        <h4>Almuerzo</h4>
        {
          datosAlmuerzo.map((element, index) => (
          <button type="submit" key={index}>{element.product} {element.valor}</button>
          ))
        }
      </div>
      
      
    </div>
  }
}

export default Menu
