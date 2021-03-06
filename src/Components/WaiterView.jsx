import React, { Fragment, useState, useEffect } from 'react';
import data from '../data.js';
import '../style/Menu-view.css';
import {firebase} from '../FirebaseConfig';

const datosDesayuno = data.Desayuno;
const datosAlmuerzo = data.Almuerzo;
const db = firebase.firestore();
//const fecha = new Date();
let arrDocument=[];
let refId = '';

const Waiter = () => {
// Estado del pedido, aquí se actualizará el estado del pedido
 const [pedido, setPedido] = useState([])
 const [cantidad, setCantidad] = useState(1)
 const [nombreCliente, setNombreCliente] = useState('')
 const [entregaPedido, setEntregaPedido] = useState([])

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

const deliver = (id) => {
  console.log(id)
  db.collection('entregar').doc(id).delete()
  .then(() => {
    console.log('El archivo listo para entregar')
  })
  .catch((error) => {
    console.log(error)
  })
}

// función para sumar el valor del pedido
const calcular = pedido.map(item => Math.floor(item.valor))
const sumar = calcular.reduce((a , b) => a + b, 0)
//console.log(sumar)

// Funcion para agregar cantidad NO FUNCIONA AÚN
const aumentar = (cantidad) => {
  //console.log(typeof cantidad)
//  setCantidad(Math.floor(cantidad += 1))
//   console.log(cantidad)
}
// Funcion para disminuir cantidad NO FUNCIONA AÚN
const disminuir = (cantidad) => {
  //console.log(typeof cantidad)
  // setCantidad(cantidad -1)
}

// Esta función enviará el pedido listo a la colección de Firebase
const totalPedido = () => {
  if (window.confirm("Quieres confirmar el pedido")) { 
   
    db.collection('cliente').add({
      //...pedido, 
      status: 'En espera',
      total: sumar,
      nombreCliente,
      fecha: new Date().toLocaleString()
      
    })
    .then( (docRef) => {
      refId = docRef.id;
      let producto= pedido.map((item) => {
        return item.producto
      })
      let cantidades = pedido.map((item) => {
        return item.cantidad
      })
      let precios = pedido.map((item) => {
        return item.valor
      })
     console.log(producto, cantidades, precios)
      db.collection('pedido').add({
        productos: producto,
        cantidades: cantidades,
        precios: precios,
        refCliente: refId

      })
      setPedido([])
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
      const data = await db.collection('entregar').orderBy("fecha","asc").get()
       arrDocument = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
    }
    catch(error){
      console.log(error)
    }
    setEntregaPedido(arrDocument)
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
        <div className="col">Aquí veremos el estatus del pedido
        {
          entregaPedido.map((item, k) => (
            <div key={k} className="orderReady orderbox">
            <div >
                <p className="clientDetail">{item.nombre}</p>
                <p className="dateDetail">{item.fecha}</p>
            </div>
            <button onClick={() => deliver(item.id)}>Entregar</button>
        </div>
          ))
        }
        </div>
    </Fragment>
    )
}

export default Waiter
