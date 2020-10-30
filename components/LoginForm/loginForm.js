import styles from './style.css'; // технология CSS-modules - уникальные стили для каждого компонента, чтобы не было конфликтов названий в разных css-файлах
import React, {useState, useContext} from 'react';
import {MyContext} from '../../script'

const LoginForm = () => {

  const context = useContext(MyContext)

   const [state, setState] = useState({
        loginClasses : styles.login ,
        email: null,
        password: null,     
            })
        
   const errorHandler = (errorclass) => {
      
       setState({ loginClasses: styles.login + " " + errorclass}
         )

         setTimeout(() => {
            
            setState(prevState =>{    // убираем инфу о классе с ошибкой через 1,5 сек
                return{
                     ...prevState,
                     loginClasses: styles.login 
                }
             })
        
        }, 1500);

        }

    const changeHandler = (event) => {
      console.log(event.target.value)
      let temp = event.target.value
      let name = event.target.name
      setState({[name]: temp}) 


      console.log({[name]: temp})
    }
   
    const Login = async (login, password) => {
 
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ'
      
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"email": login, "password": password, "returnSecureToken": true})   
      })
  

      let commits = await response.json();
  
      console.log(commits.idToken)

     
      context.loadData({ imageURLs: [
            "https://dishingouthealth.com/wp-content/uploads/2020/02/VegPaella-500x500.jpg",
            "https://cdn2.specialist.ru/Content/Image/News/Small/reacttrassem-s.jpg"
            ]})
    }

 

  console.log("loginClasses при каждом рендере компонента LoginForm" + state.loginClasses);
    return (
    <>
<div className={ styles.loginContainer }>
  <section className={state.loginClasses} id="login">
   <header>
      <h2>Application Name</h2>
      <h4>Login</h4>
    </header>
    <form className={styles.loginForm } onSubmit={(e)=> {e.preventDefault();Login(state.user,state.password)}} action="#" method="post">
      <input name="email" type="text" onChange={changeHandler} className={styles.loginInput} placeholder="User" required autoFocus/>
      <input name="password" type="password" onChange={changeHandler} className={styles.loginInput} placeholder="Password" required/>
      <div className="submitContainer">
        <button type="submit" className={styles.loginButton}>SIGN IN</button>
      </div>
    </form>
  </section>
 
</div>

<button id="e1" onClick={() => errorHandler(styles.error_1)} >Login error!</button>

    </>
)

}





export default LoginForm