import React from 'react';
import './App.css';
import Main from './Components/Main-view';
import { BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
//import Menu from './Components/Menu';
import Viewmenu from './Components/Menu-view';
import AuthPersonal from './Components/AuthPersonal';
import KitchenView from './Components/KitchenView';
import PruebaEnvio from './Components/PruebaEnvio';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AuthPersonal/>
        </Route>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/mesero">
          <Viewmenu   />
        </Route>
        <Route exact path="/cocina">
          <KitchenView/>
        </Route>
        <Route exact path="/prueba">
          <PruebaEnvio/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
