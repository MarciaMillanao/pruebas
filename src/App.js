import React from 'react';
import './App.css';
import Main from './Components/Main-view';
import { BrowserRouter as Router,
   Switch, Route} from 'react-router-dom';
import Menu from './Components/Menu';
import Authview from './Components/Auth-view';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/autenticar">
        <Authview />
      </Route>
      <Route exact path="/mesero">
        <Menu/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
