import React from 'react';

function Gallery(props){
console.log(props)
let imgs = props.urls.map((v)=> <img src={v}/>)
console.log(imgs)
    return (
        <>
        <h1>The Gallery</h1>
        {imgs}
        </> 
    )
    
 
}    

export default Gallery

// сделать функциональный компонент (до этого делали только классовые), 
// достать из переданных этому компоненту параметров инфу и отрендерить картинки.

// Параметры компоненту Gallery передали в Script.js 


