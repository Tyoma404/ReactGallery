function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // import React from 'react';
// import ReactDOM from 'react-dom';

class LoginForm extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",


    {
      loginClasses: 'login' // в состоянии приложения храним какие CSS классы у нашей формы
    });_defineProperty(this, "errorHandler",

    e => {

      let errorclass = e.target.dataset.errorclass;

      this.setState(prevState => {//  состояние меняется только через метод setState
        return {
          ...prevState,
          loginClasses: 'login' + " " + errorclass };

      });

      setTimeout(() => {

        this.setState(prevState => {// убираем инфу о классе с ошибкой через 1,5 сек
          return {
            ...prevState,
            loginClasses: 'login' };

        });

      }, 1500);

    });}


  render() {
    console.log("loginClasses при каждом рендере компонента: LoginForm" + this.state.loginClasses);
    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { className: "loginContainer" },
      React.createElement("section", { className: this.state.loginClasses, id: "login" },
      React.createElement("header", null,
      React.createElement("h2", null, "Application Name"),
      React.createElement("h4", null, "Login")),

      React.createElement("form", { className: "loginForm", action: "#", method: "post" },
      React.createElement("input", { type: "text", className: "loginInput", placeholder: "User", required: true, autoFocus: true }),
      React.createElement("input", { type: "password", className: "loginInput", placeholder: "Password", required: true }),
      React.createElement("div", { className: "submitContainer" },
      React.createElement("button", { type: "submit", className: "loginButton" }, "SIGN IN"))))),






      React.createElement("button", { id: "e1", onClick: this.errorHandler, "data-errorclass": "error_1" }, "Login error!")));



  }}



ReactDOM.render(React.createElement(LoginForm, null), document.querySelector('#App'));


/*
                                                                                       Задача:
                                                                                       0. Пробежаться по коду с комментариями. Жмакнуть кнопку-ошибку, посмотреть в консоль как меняются css-классы у формы и как часто происходит перерендер.
                                                                                       1. Делаем пустой новый yarn проект ReactGallery с index.html, index.js, style.css
                                                                                       2. Добавляем библитеку parcel
                                                                                       3. Для быстрозапуска в package.json добавим скрипт
                                                                                       
                                                                                       "scripts": {"start": "yarn parcel serve index.html"}
                                                                                       
                                                                                       Запускаются скрипты с консоли yarn run название_скрипта
                                                                                       
                                                                                       4. Импортируем компонент <LoginForm/> такой же как тут в кодпене из репозитория. С Parcel можно импортиртировать любой репозиторий, где есть js-файлы с командой exports внутри. 
                                                                                       
                                                                                       yarn add https://github.com/vaduga/LoginForm.git
                                                                                       
                                                                                       5. Подсматривая как организован пакет LoginForm, прикручиваем React и создаем свой компонент <App/> который рендерит примерно так:
                                                                                       
                                                                                       render() {
                                                                                       return (
                                                                                       <>
                                                                                       <LoginForm/>
                                                                                       <Gallery/>
                                                                                       </>)
                                                                                       }
                                                                                       
                                                                                       6. Делаем компонент Gallery, который хранит у себя в объекте state массив ссылок на картинки
                                                                                       
                                                                                       Рендерим список картинок по ссылкам из state. 
                                                                                       Как рендерить список? Смотреть документацию React, вспомнить про функции высшего порядка map
                                                                                       https://ru.reactjs.org/docs/lists-and-keys.html
                                                                                       
                                                                                       */