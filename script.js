/* eslint-disable react/prop-types */
// import LoginForm from './components/LoginForm/loginForm';
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Gallery from "./components/Gallery/gallery";
import SignIn from "./components/Signin/signin";
import Blank from "./components/Blank/blank";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import styles from "./style.module.css";

export const MyContext = React.createContext();

const MyProvider = props => {
  const [state, setState] = useState({
    imageURLs: [],
    isLogged: false
  });

  const loadData = data => {
    setState(data);
  };

  return (
    <MyContext.Provider value={{ state, loadData }}>
      {props.children}
    </MyContext.Provider>
  );
};

const PrivateContent = props => {
  const content = props.isLogged ? (
    props.children
  ) : (
    <Redirect to="/loginSection"></Redirect>
  );

  return <>{content}</>;
};

const App = () => {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    console.log("isLogged" + isLogged);
  }, [isLogged]);

  return (
    <MyProvider>
      <Router>
        <ul>
          <Link to="/privateContent/test">
            <li>Test</li>
          </Link>
          <Link to="/privateContent">
            <li>Show Private content</li>
          </Link>

          <br />

          <li>
            <a id={styles.out} onClick={() => setLogged(false)}>
              Public only (Logout)
            </a>
          </li>
        </ul>

        <div className={styles.sections}>
          <h1 id="gr">Public Section</h1>
        </div>

        <div className={styles.sections + " " + styles.private}>
          <Switch>
            <Route exact path="/privateContent">
              <PrivateContent isLogged={isLogged}>
                <Gallery />
              </PrivateContent>
            </Route>

            <Route path="/privateContent/test">
              <PrivateContent isLogged={isLogged}>
                <Blank />
              </PrivateContent>
            </Route>

            <Route path="/loginSection">
              <SignIn setLogged={setLogged} />
            </Route>
          </Switch>
        </div>
      </Router>
    </MyProvider>
  );
};

ReactDom.render(<App />, document.querySelector("#myApp"));
