import React from 'react';
import './App.css';
import Main from './Components/Main-view';
import { BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
//import Menu from './Components/Menu';
import Viewmenu from './Components/Menu-view';
import AuthPersonal from './Components/AuthPersonal';

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
      </Switch>
    </Router>
  );
}

export default App;
