import React, {useEffect, useState } from 'react';
import {firebase} from '../FirebaseConfig';
import Imagen from '../img/1687f20dd9b845b2b7478240414a9b62.jpg';
import { withRouter } from "react-router-dom";


const AuthPersonal = (props) => {
  const [personalNombre, setPersonalNombre] = useState([])
  const [personalPassword, setPersonalPassword] = useState([])
  const [personalCargo, setPersonalCargo] = useState([])
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')

  useEffect(( )=> {
    const autenticar = async () => {
      try{
        const db = firebase.firestore()
        const data = await db.collection('personal').get()
        const user = data.docs.map(doc => ({id:doc.id, ...doc.data()}
        ))
        let arrNombres =user.map( item => item.nombre)
         let arrPassword = user.map(item => item.password)
         let arrCargo = user.map(item => item.cargo)
         setPersonalNombre(arrNombres);
         setPersonalPassword(arrPassword)
         setPersonalCargo(arrCargo)
         
      }catch(error){
        console.log(error)
      }
    } 
    autenticar()
    setNombre('')
    setPassword('')
  }, [])

  const Validar = () => {
    if (personalNombre.indexOf(nombre) !== -1 && personalPassword.indexOf(password) !== -1){
       const indexName = personalNombre.findIndex(name => name === nombre)

       if (personalPassword[indexName] === password){
           console.log('personal validado')
           if(personalCargo[indexName] === 'mesero'){
            return props.history.push('/mesero')
           }else{
             return  props.history.push('/cocina')
           }
            
            
       }
       else{
        alert('22No existe ususario o email, revisa de nuevo')
        return props.history.push('/')
       }
     }
     else{
         alert('No existe ususario o email, revisa de nuevo')
         return props.history.push('/')
     }
    
  }

    return (
        <div>
            <div> <img src={Imagen} alt="Logo" /></div>
            <div> 
                <h4>Ingreso personal</h4>
                <form>
                <input type="text" placeholder="Ingresa tu Nombre" className="input-form" onChange={(e) => setNombre(e.target.value)}/>
                <input type="password" placeholder="Ingresa tu Contraseña" className="input-form" onChange={(e) => setPassword(e.target.value)}/>
                </form>
                <button onClick={() => Validar()}>Ingresar
                </button>
            </div>
        </div>
    )
}

export default withRouter (AuthPersonal)
