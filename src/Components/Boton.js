import React from 'react';


class Boton extends React.Component {
  render() {
    return <button type="button" className="btn btn-light">{this.props.nombre}</button>
  }
}

export default Boton