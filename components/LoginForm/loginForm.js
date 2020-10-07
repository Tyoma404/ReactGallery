import styles from './style.css'; // технология CSS-modules - уникальные стили для каждого компонента, чтобы не было конфликтов названий в разных css-файлах
import React from 'react';
import "@babel/polyfill"; //полифил для async функций. Ошибка была "regeneratorRuntime is not defined". Потом уточним почему без него не работает.

async function Login(login, password){
 
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ'
  
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({"email": login, "password": password, "returnSecureToken": true})   
  });

  let commits = await response.json();
  console.log(commits)
return commits.idToken
}  

class LoginForm extends React.Component {


    state = {
        loginClasses : styles.login ,
        email: null,
        password: null,     
            }
        
    errorHandler = (e) => {
      
       let errorclass = e.target.dataset.errorclass            
       
       this.setState({ loginClasses: styles.login + " " + errorclass}
         )

         setTimeout(() => {
            
            this.setState(prevState =>{    // убираем инфу о классе с ошибкой через 1,5 сек
                return{
                     ...prevState,
                     loginClasses: styles.login 
                }
             })
        
        }, 1500);

        }

    changeHandler = (event) => {
      console.log(event.target.value)
      let temp = event.target.value
      let name = event.target.name
      this.setState({[name]: temp}) 


      console.log({[name]: temp})
    }
   
  



 

 
render() {
  console.log("loginClasses при каждом рендере компонента LoginForm" + this.state.loginClasses);
    return (
    <>
<div className={ styles.loginContainer }>
  <section className={this.state.loginClasses} id="login">
   <header>
      <h2>Application Name</h2>
      <h4>Login</h4>
    </header>
    <form className={styles.loginForm } onSubmit={(e)=> {e.preventDefault();Login(this.state.user,this.state.password)}} action="#" method="post">
      <input name="email" type="text" onChange={this.changeHandler} className={styles.loginInput} placeholder="User" required autoFocus/>
      <input name="password" type="password" onChange={this.changeHandler} className={styles.loginInput} placeholder="Password" required/>
      <div className="submitContainer">
        <button type="submit" className={styles.loginButton}>SIGN IN</button>
      </div>
    </form>
  </section>
 
</div>

<button id="e1" onClick={this.errorHandler} data-errorclass={styles.error_1}>Login error!</button>

    </>
)
}
}





export default LoginForm