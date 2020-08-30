import React from 'react';
import './App.css';
import Main from './Components/Main-view';
import { BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
//import Menu from './Components/Menu';
import Viewmenu from './Components/Menu-view';
import Authview from './Components/Auth-view';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Authview />
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
