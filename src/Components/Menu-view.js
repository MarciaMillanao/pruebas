import React from 'react'
import {Link} from 'react-router-dom';
import Waiter from './WaiterView.jsx';
//import Menu from './Menu';
import '../style/Menu-view.css'



function Viewmenu() {
  return (
    <div className="viewMesero container-fluid">
      <Link to="/main">
        <h1>Logo</h1>      
      </Link>
      <div className="actionMesero row">
          <Waiter/>
      </div>
    </div>
  )
}

export default Viewmenu
