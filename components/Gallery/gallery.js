import React, { useContext } from 'react';
import {MyContext} from '../../script'
import Recipe from '../../components/Recipe/recipe'
import { makeStyles } from '@material-ui/core/styles';

const Gallery = ()=>{

    const useStyles = makeStyles((theme) => ({     // кастомный хук от materialUI для стилизации компонентов в JS
        headers: {
            color: "#a61696"
        },
        container: {
            display: "flex"
          }
    } 
          ));

    const classes = useStyles();

const context = useContext(MyContext)


let recipes = context.state.imageURLs[0] && context.state.imageURLs.map((v, index)=> <Recipe key={index} imgUrl={v}/>)

    return (
        <>
        <h1 className={classes.headers}>The Recipes Gallery</h1>
        <div className={classes.container}>
        {recipes}
        </div>
        </> 
    )
    
 
}    

export default Gallery



