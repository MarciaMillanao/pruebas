import React, {Fragment, useState, useEffect} from 'react';
import data from '../data.js';
import {firebase} from '../FirebaseConfig';

const datosDesayuno = data.Desayuno;
const datosAlmuerzo = data.Almuerzo;
const db = firebase.firestore();
//const fecha = new Date();
let arrDocument=[];
let refId = '';

function PruebaEnvio() {
 // Estado del pedido, aquí se actualizará el estado del pedido
 const [pedido, setPedido] = useState([])
 const [cantidad, setCantidad] = useState(1)
 const [nombreCliente, setNombreCliente] = useState('')

//Aquí vamos agregando al array vacío los productos que se van haciendo click
 const  addProduct = (product) => {   
  setPedido([
    ...pedido,
    {producto: product.name, valor: product.value, id:product.id, cantidad}
  ]) 
}

// Aquí iremos eliminando los productos del pedido, antes de enviarse a la cocina
const eliminarItem = id => {
  const arrayFiltrado = pedido.filter(item => item.id !== id) 
  setPedido(arrayFiltrado)
}

// función para sumar el valor del pedido
const calcular = pedido.map(item => Math.floor(item.valor))
const sumar = calcular.reduce((a , b) => a + b, 0)
console.log(sumar)

// Funcion para agregar cantidad NO FUNCIONA AÚN
const aumentar = (cantidad) => {
  console.log(typeof cantidad)
//  setCantidad(Math.floor(cantidad += 1))
//   console.log(cantidad)
}
// Funcion para disminuir cantidad NO FUNCIONA AÚN
const disminuir = (cantidad) => {
  console.log(typeof cantidad)
  // setCantidad(cantidad -1)
}



// Esta función enviará el pedido listo a la colección de Firebase
const totalPedido = () => {
  if (window.confirm("Quieres confirmar el pedido")) { 
   
    db.collection('pedido').add({
      status: 'En espera',
      total: sumar,
      nombreCliente,
      pedido: {...pedido}
    })
    .then( (docRef) => {
      refId = docRef.id;
      setPedido([])
      
      console.log("Id del documento: " , docRef.id )
    })
    .catch((error) => {
      console.log(error)
    })
  }else{
    console.log('ok sigue en en lo tuyo')
  }
}

useEffect(() => {
  const visualizarPedidos = async () => {
    try {
      const data = await db.collection('pedido').get()
       arrDocument = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
      console.log(32, arrDocument)
    }
    catch(error){
      console.log(error)
    }
  }
  visualizarPedidos();
}, [])
 

  return (
    <Fragment>
      <div className="menuSection col">
        <div >
          <h4>Desayuno</h4>
            {
            datosDesayuno.map((element) => (
            <button className="styleButtonMenu btn" key={element.id} name={element.product} value={element.valor} id={element.id} onClick={(e) => addProduct(e.target)
            }>{element.product}${element.valor}</button>
            ))
            }
        </div>
        <div>
        <h4>Almuerzo</h4>
        {
          datosAlmuerzo.map((element) => (
          <button className="styleButtonMenu btn" key={element.id} name={element.product} value={element.valor} id={element.id} onClick={(e) => addProduct(e.target)}>{element.product}${element.valor}</button>
          ))
        }
      </div>     
    </div>
    <div className="billSection col">Aquí va el pedido
        <div>
          <h6>Ingresa nombre cliente</h6>
          <input type="text" placeholder="nombre del cliente" onChange={(e) => setNombreCliente(e.target.value)}/>
        </div>
        {
          pedido.map((item) => (
            <li key={item.id}>
              {item.producto} {item.valor}
              <button onClick={(e) => aumentar(Math.floor(e.target.cantidad) )}>+</button> <span>{cantidad}</span>
              <button onClick={() => disminuir()}>-</button>
              <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </li>
          ))   
        }
        <div> <hr/>
          {
            <p>Total del pedido: {sumar}</p>
          }
        </div>
        <button onClick={() => totalPedido()}>Enviar pedido</button>
    </div>
        <div className="statusOrder col">Aquí veremos el estatus del pedido
        {
          arrDocument.map((item) => (
          <div key={item.id}>{item.nombreCliente}
          <button>Por Entregar</button>
          </div>
          ))
        }
        </div>
    </Fragment>
    )
}

export default PruebaEnvio
