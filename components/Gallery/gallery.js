import React, { useContext } from 'react';

const Gallery = ()=>{

const context = useContext(MyContext)

// const context = {state: { imageURLs: [
//     "https://steemitimages.com/DQmRjArytrorSKNahEjyXyh683teXv3E1qCoz8jjzG38QVo/react.js-logo.png",
//     "https://cdn2.specialist.ru/Content/Image/News/Small/reacttrassem-s.jpg"
//     ]}}
let imgs = context.state.imageURLs[0] && context.state.imageURLs.map((v, index)=> <img key={index} src={v}/>)
console.log(imgs)
    return (
        <>
        <h1>The Gallery</h1>
        {imgs}
        </> 
    )
    
 
}    

export default Gallery



