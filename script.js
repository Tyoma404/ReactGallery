// import LoginForm from './components/LoginForm/loginForm';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Gallery from './components/Gallery/gallery'
import SignIn from './components/Signin/signin'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
BrowserRouter,
Switch, Redirect,
Route,
Link
} from "react-router-dom";


export const MyContext = React.createContext()

const MyProvider = (props) =>{
    const [state, setState] = useState({
        imageURLs :[],
        isLogged : false   
        })

    const loadData = (data) => {
            setState(data)
        }

return (
<MyContext.Provider value={{state, loadData}}>

{props.children}
</MyContext.Provider>
)
}

const PrivateContent = (props)=> {
        let show = false
        
        const content = show? props.children : null
        return (
                <>
                
                {show? content : null}
               
                </>
        )
        
        }


const App = () => {

        const useStyles = makeStyles((theme) => ({
                paper: {
                  marginTop: theme.spacing(8),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }
              }));
        
 
  const [isLogged, setLogged] = useState(false)
  const [showPrivate, setShow] = useState(false)


//   const content = isLogged? <Gallery/> :<SignIn setLogged={setLogged}/> 



        return (
<MyProvider>
<BrowserRouter>
<CssBaseline />    {/* чтобы здесь стили body, css соответствовали тем что навяжут material UI компоненты*/}


<ul style={{listStyleType: "none",fontSize: "15px", position: "absolute", left: "5px", top: "5px"}}>
        <Link to="/privateContent">        
        <li style={{textDecoration: "underline"}} onClick={()=> isLogged ? setShow(showPrivate) : setShow(showPrivate)}>Show/Hide Private content</li>
        </Link>

        <br/>

        

        <Link to="/loginSection">
        <li style={{textDecoration: "underline"}} onClick={()=>{isLogged? setLogged(false) : none}}>Public only (LogOut)</li>
        </Link>
</ul>



<div style={{margin: "auto 20%", border: "2px dotted grey", textAlign: "center"}}>
<h1>Public Section</h1>
</div>

<div style={{margin: "auto 20%", border: "2px solid black", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px"}}>


<Switch>
<Route path="/">
<Redirect to="/loginSection"></Redirect>
</Route>

        <Route path="/privateContent">
<PrivateContent>
<Gallery/>
</PrivateContent>
        </Route>
        
        <Route path="/loginSection">
        <>
        <p>sdfdsf</p>
        <SignIn setLogged={setLogged}/>
        </>
        </Route>
</Switch>



</div>
</BrowserRouter>
</MyProvider>

        )
    
}

ReactDom.render(<App/>, document.querySelector('#myApp'))




