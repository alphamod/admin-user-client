import './App.css';
import NavBar from './components/NavBar';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Email from './components/Email';

function App() {

  const history = createBrowserHistory();

  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/email" component={Email}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
