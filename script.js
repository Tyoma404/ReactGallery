// import LoginForm from './components/LoginForm/loginForm';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Gallery from './components/Gallery/gallery'
import SignIn from './components/Signin/signin'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';



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


  const content = isLogged? <Gallery/> :<SignIn setLogged={setLogged}/> 


        return (
<MyProvider>
<CssBaseline />    {/* чтобы здесь стили body, css соответствовали тем что навяжут material UI компоненты*/}
<ul style={{listStyleType: "none",fontSize: "15px", position: "absolute", left: "5px", top: "5px"}}>
                
        <li style={{textDecoration: "underline"}} onClick={()=>setShow(!showPrivate)}>Show/Hide Private content</li>
        <br/>
        <li style={{textDecoration: "underline"}} onClick={()=>{setLogged(false)}}>Public only (LogOut)</li>
</ul>



<div style={{margin: "auto 20%", border: "2px dotted grey", textAlign: "center"}}>
<h1>Public Section</h1>
</div>

<div style={{margin: "auto 20%", border: "2px dotted grey", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px"}}>

{showPrivate? content : null }




</div>

</MyProvider>

        )
    
}

ReactDom.render(<App/>, document.querySelector('#myApp'))




