/* eslint-disable react/prop-types */
// import LoginForm from './components/LoginForm/loginForm';
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  const [redirector, setRedirector] = useState("gallery");

  useEffect(() => {
    console.log("isLogged" + isLogged);
  }, [isLogged]);

  return (
    <MyProvider>
      <CssBaseline />
      <Router>
        <ul>
          <Link to="/privateContent/blank">
            <li onClick={() => setRedirector("blank")}>Show blank</li>
          </Link>
          <Link to="/privateContent/gallery">
            <li onClick={() => setRedirector("gallery")}>Show Gallery</li>
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
            <Route path="/loginSection">
              <SignIn redirector={redirector} setLogged={setLogged} />
            </Route>
            <Route path="/privateContent">
              <PrivateContent isLogged={isLogged}>
                <Route path="/privateContent/gallery">
                  <Gallery />
                </Route>

                <Route exact path="/privateContent/blank">
                  <Blank />
                </Route>
              </PrivateContent>
            </Route>
          </Switch>
        </div>
      </Router>
    </MyProvider>
  );
};

ReactDom.render(<App />, document.querySelector("#myApp"));
