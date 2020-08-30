import React from 'react';
import data from '../data';
import '../style/Menu-view.css'

const datosDesayuno = data.desayuno;
const datosAlmuerzo = data.almuerzo;
class Menu extends React.Component {
  
  render() {
    return (
    <div className="menuContainer col">
      <div>
        <h4>Desayuno</h4>
        {
          datosDesayuno.map((element, index) => (
          <button className="styleButtonMenu btn" type="submit" key={index} name={element.product} value={element.valor}>{element.product}<span className="salto">${element.valor}</span></button>
          ))
        }
      </div>
      <div>
        <h4>Almuerzo</h4>
        {
          datosAlmuerzo.map((element, index) => (
          <button className="styleButtonMenu btn" type="submit" key={index} value={element.valor}>{element.product}<span className="salto">${element.valor}</span> </button>
          ))
        }
      </div>    
    </div>)
  }
}

export default Menu
