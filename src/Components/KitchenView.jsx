import React, { useState, useEffect } from 'react'
import {firebase} from '../FirebaseConfig';
import {Link} from 'react-router-dom';
import '../style/Kitchen.css';

const db = firebase.firestore();
const ref = db.collection('pedido')
let pedidoFinal= [];

const KitchenView = () => {
const [order, setOrder] = useState([])
let arrCliente= [];
let arrOrder= [];

const getOrder = async () => {
    try{
       const dataClient= await db.collection('cliente').get()
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

const actualizandoPedido = () => {
    console.log('escucho el click')
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
                                       </div>
                                   ))
                                }
                                <button onClick={() => actualizandoPedido()}>Preparando</button>
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
