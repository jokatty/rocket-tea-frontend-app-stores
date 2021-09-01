import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import StoreApp from './components/StoreApp/StoreApp.jsx';

/* =========================================================== CONTEXT */
import { IsLoggedInProvider } from './context/IsLoggedIn.jsx';

/* =================================================================== */
/* ============================================================== MAIN */
/* =================================================================== */
function App() {
  /* =========================================================== RENDER */
  return (
    <Router>
      <Switch>
        <IsLoggedInProvider>
          <Route path="/store/:id" exact component={StoreApp} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
        </IsLoggedInProvider>
      </Switch>
    </Router>
  );
}

export default App;
