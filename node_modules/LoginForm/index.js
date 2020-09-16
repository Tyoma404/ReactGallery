import styles from './style.css'; // технология CSS-modules - уникальные стили для каждого компонента, чтобы не было конфликтов названий в разных css-файлах
import React from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {


    state = {
        loginClasses : styles.login        // в состоянии приложения храним какие CSS классы у нашей формы
            }
        
    errorHandler = (e) => {
      
       let errorclass = e.target.dataset.errorclass            
       
       this.setState(prevState =>{         //  так меняется состояние, обязательно делать копию с помощью REST оператора ...    
            return{
                 ...prevState,
                 loginClasses: styles.login + " " + errorclass          
            }
         })

         setTimeout(() => {
            
            this.setState(prevState =>{    // убираем инфу о классе с ошибкой через 1,5 сек
                return{
                     ...prevState,
                     loginClasses: styles.login 
                }
             })
        
        }, 1500);

        }

 
render () {
  console.log("loginClasses при каждом рендере компонента LoginForm" + this.state.loginClasses);
    return (
    <>
<div className={ styles.loginContainer }>
  <section className={this.state.loginClasses} id="login">
   <header>
      <h2>Application Name</h2>
      <h4>Login</h4>
    </header>
    <form className={styles.loginForm } action="#" method="post">
      <input type="text" className={styles.loginInput} placeholder="User" required autoFocus/>
      <input type="password" className={styles.loginInput} placeholder="Password" required/>
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

ReactDOM.render(<LoginForm/>,document.querySelector('#App'))


export default LoginForm