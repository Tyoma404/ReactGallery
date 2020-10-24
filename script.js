import LoginForm from './components/LoginForm/loginForm';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Gallery from './components/Gallery/gallery'

const MyContext = React.createContext()

const MyProvider = (props) =>{
    const [state, setState] = useState({
        imageURLs :[]   
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
   
        return (
<MyProvider>
<h1>Hey!</h1>

<LoginForm/>
<Gallery/>

</MyProvider>

        )
    
}

ReactDom.render(<App/>, document.querySelector('#myApp'))



