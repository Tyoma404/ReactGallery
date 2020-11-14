import React, { useContext } from "react";
import { MyContext } from "../../script";
import Recipe from "../../components/Recipe/recipe";
import styles from "./style.module.css";

const Gallery = () => {
  const context = useContext(MyContext);

  let recipes =
    context.state.imageURLs[0] &&
    context.state.imageURLs.map((v, index) => (
      <Recipe key={index} imgUrl={v} />
    ));

  return (
    <>
      <h1 className={styles.headers}>The Recipes Gallery</h1>
      <div className={styles.container}>{recipes}</div>
    </>
  );
};

export default Gallery;
