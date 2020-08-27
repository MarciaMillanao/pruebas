import React from 'react'
import {Link} from 'react-router-dom';

function Authview() {
    return (
        <div>
            <h4>Aquí autentificamos</h4>
            <Link to="/mesero">
            <button>No vamos a la vista Mesero</button>
            </Link>
        </div>
    )
}

export default Authview
