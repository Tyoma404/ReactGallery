// import LoginForm from './components/LoginForm/loginForm';
import React, {useState, useEffect} from 'react';
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
        
        
        const content = props.isLogged ? props.children : <Redirect to="/loginSection"></Redirect>


        return (
                <>
                
                {content}
               
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

  useEffect(()=> {
          console.log("isLogged"+isLogged)
  }, [isLogged])




        return (
<MyProvider>
<BrowserRouter>
<CssBaseline />    {/* чтобы здесь стили body, css соответствовали тем что навяжут material UI компоненты*/}


<ul style={{listStyleType: "none",fontSize: "15px", position: "absolute", left: "5px", top: "5px"}}>
        <Link to="/privateContent">        
        <li style={{textDecoration: "underline"}} >Show Private content</li>
        </Link>

        <br/>

        
        <li> <a style={{textDecoration: "underline"}} onClick={()=>{isLogged? setLogged(false) : none}} >Public only (Logout)</a></li>
        
</ul>



<div style={{margin: "auto 20%", border: "2px dotted grey", textAlign: "center"}}>
<h1>Public Section</h1>
</div>

<div style={{margin: "auto 20%", border: "2px solid black", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px"}}>


<Switch>

<Route path="/privateContent">
<PrivateContent isLogged={isLogged}>
<Gallery/>
</PrivateContent>
</Route>
        
        <Route path="/loginSection">
               <SignIn setLogged={setLogged}/>
         </Route>
</Switch>



</div>
</BrowserRouter>
</MyProvider>

        )
    
}

ReactDom.render(<App/>, document.querySelector('#myApp'))




