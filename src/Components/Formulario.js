import React from 'react';
import Boton from './Boton.js';
import {Container, Row, Col} from 'react-bootstrap';
import Imagen from '../img/1687f20dd9b845b2b7478240414a9b62.jpg';
import {Link} from 'react-router-dom';
import '../style/formulario.css';

class Formulario extends React.Component {
  render() {
    return <Container fluid="md">
      <Row>
        <Col md="6">
          <img src={Imagen} alt="Logo" />
        </Col>
        <Col md="6">
          <Row className="container-ingreso">
            <Row className="container-title">
              <Col>
                <h1>BURGER QUEEN</h1>
              </Col>
            </Row>
            <Row className="container-form">
              <form>
                <input type="text" placeholder="Ingresa tu Nombre" className="input-form"></input>
                <input type="email" placeholder="Ingresa tu Email" className="input-form"></input>
                <input type="password" placeholder="Ingresa tu Contraseña" className="input-form"></input>
                <Link to="/main">
                  <Boton nombre="Ingresar"/>
                </Link>
              </form>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
    
  }
}

export default Formulario