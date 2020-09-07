import React, { useState, useEffect } from 'react'
import {firebase} from '../FirebaseConfig';
import {Link} from 'react-router-dom';
import '../style/Kitchen.css';

const db = firebase.firestore();
let pedidoFinal= [];

const KitchenView = () => {
const [order, setOrder] = useState([])
const [buttonStatus, setButtonStatus] = useState(true)
const [buttonMode, setButtonMode] = useState(false)
let arrCliente= [];
let arrOrder= [];

const getOrder = async () => {
    try{
       const dataClient= await db.collection('cliente').orderBy("fecha", "asc").get()
       const dataORder = await db.collection('pedido').get()
       arrCliente = dataClient.docs.map(doc => ({...doc.data(), id:doc.id}))
       arrOrder = dataORder.docs.map(doc => ({...doc.data()}))
       arrCliente.map(item => {
           arrOrder.map(element => {
            if(item.id === element.refCliente){
                pedidoFinal.push({...item, ...element })
            }
        })
       })
       setOrder(pedidoFinal)
    }
    catch(error){
        console.log(error)
    }
}

const preparandoPedido = (id) => {
    setButtonStatus(false)
    db.collection('cliente').doc(id).update({
        status: 'Preparando'
    })
    .catch((error) => {
        console.log(error)
    })
}
const borrarPedido = (id) => {
    let idRef = id;
    db.collection('cliente').doc(id).delete()
    .then(() => {
        console.log('se borró cliente '+ id )
        db.collection('pedido').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(idRef === doc.data().refCliente){
                    let idDoc = doc.id
                    db.collection('pedido').doc(idDoc).delete()
                    .then(() => {
                        console.log('Se borró el pedido: '+ idDoc)
                    })
                }
            })
        })
    })
}

const listoPedido = (id, nombreCliente, fecha) => {
    db.collection('cliente').doc(id).update({
        status: 'Por entregar'
    })
    .then(()=> {
        setButtonMode(true)
        db.collection('entregar').add({
            nombre: nombreCliente,
            fecha,
            estado: 'Por entregar'
        })
        borrarPedido(id)
    })
    .catch((error) => {
        console.log(error)
    })
}

useEffect(() => {
    
    getOrder()

}, [])

    return (
        <div className="viewMesero">
            <Link to="/main">
                <h1>Logo</h1>      
            </Link>
            <div className="actionKitchen">
                <div className="statusOrder col-8">
                    {
                        order.map((item, i) => (
                            <div key={i} className="containerOrderDetail col-6">
                                {
                                   [item].map((ele, e) => (
                                       <div key={e}>
                                           <p >{ele.nombreCliente} <span>{ele.fecha}</span></p>
                                           <div  className="order">
                                           <div className="detailOrder">
                                           {
                                               [ele.cantidades].map((element, k) => (
                                               <div key={k}>{
                                                element.map((pro, p) => (
                                                <li key={p}>{pro}</li>
                                                    ))
                                                }</div>
                                               ))
                                           }
                                           </div>
                                           <div className="detailOrder">
                                           {
                                               [ele.productos].map((element, k) => (
                                                <div key={k}>{
                                                    element.map((pro, p) => (
                                                        <li key={p}>{pro}</li>
                                                            ))
                                                }</div>
                                                ))
                                           }
                                           </div>
                                           <div className="detailOrder">
                                           {
                                               [ele.precios].map((element, k) => (
                                                <div key={k}>{
                                                    element.map((pro, p) => (
                                                        <li key={p}>{pro}</li>
                                                            ))
                                                }</div>
                                                ))
                                           }
                                           </div>
                                           </div>
                                            <p>estado del pedido: {ele.status}</p>
                                            {
                                              (ele.status === 'En espera')? (<button onClick={() => preparandoPedido(ele.refCliente)}>Preparando</button>) : (<button onClick={() => listoPedido(ele.refCliente, ele.nombreCliente, ele.fecha)} >Listo</button>) 
                                                
                                            }
                                       </div>
                                   ))
                                }
                                
                            </div>
                        ))
                    }
                 <div className="orderOk col-4">aquí se muestran los listos para entregar</div> 
            </div>
        </div>
        </div>
    )
}

export default KitchenView
