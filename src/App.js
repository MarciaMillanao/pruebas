import React from 'react';
import './App.css';
//import Main from './Components/Main-view';
import { BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
//import Menu from './Components/Menu';
import Authview from './Components/Auth-view';
import Formulario from './Components/Formulario';
import Main from './Components/Main-view';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Formulario />
      </Route>
      <Route exact path="/main">
        <Main />
      </Route>
      <Route exact path="/autenticar">
        <Authview/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
