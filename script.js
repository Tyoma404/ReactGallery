import LoginForm from './components/LoginForm/loginForm';
import React from 'react';
import ReactDom from 'react-dom';
import Gallery from './components/Gallery/gallery'

class App extends React.Component {

state = {
imageURLs :[] 
    
}

loadData = (data) => {
    this.setState(data)
}
    render() {
        
        return (
<>
<h1>Hey!</h1>
<LoginForm onLogin={this.loadData}/>
<Gallery urls={this.state.imageURLs}/>
</>

        )
    }
}

ReactDom.render(<App/>, document.querySelector('#myApp'))




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