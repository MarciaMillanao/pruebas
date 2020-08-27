import React from 'react';
import Boton from './Boton.js';
import {Container, Row, Col} from 'react-bootstrap';
import Imagen from '../img/1687f20dd9b845b2b7478240414a9b62.jpg';
import '../style/main.css';
import {Link} from 'react-router-dom';



class Main extends React.Component {
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
            <Row className="container-btn">
              <Col md="6">
                <Link to="/autenticar">
                <Boton nombre="Mesero"/>
                </Link>
              </Col>
              <Col md="6">
              <Boton nombre="Cocinero" />
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>  
  }
}

export default Main