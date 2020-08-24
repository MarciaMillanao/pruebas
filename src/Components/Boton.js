import React from 'react';

class Boton extends React.Component {
  render() {
    return <button>{this.props.nombre}</button>
  }
}

export default Boton