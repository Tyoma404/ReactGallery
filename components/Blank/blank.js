import styles from "./blank.module.css";
import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import MyBar from "./myBar.js";

const debounce = (func, delay) => {
  // обычный дебаунс
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function Test() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const skipUpdate = useCallback(
    debounce(percentCompleted => {
      setProgress(percentCompleted);
      console.log("download progress:", percentCompleted);
    }, 100),
    []
  );

  async function downloadFile(url, count) {
    const response = await axios({
      url,
      responseType: "blob",

      onDownloadProgress: progressEvent => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        skipUpdate(percentCompleted);
      }
    }).catch(error => {
      console.log(error);
    });

    const reader = new window.FileReader();
    reader.readAsDataURL(response.data);
    reader.onload = () => {
      document.getElementById("imgFetched").src = reader.result;
    };
    setLoaded(true);
  }

  useEffect(
    () =>
      downloadFile(
        "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg"
      ),
    []
  );

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 5 : prevProgress + 5));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  const reset = () => {
    setLoaded(false);
    downloadFile(
      "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg"
    );
    setProgress(0);
  };

  const reloadBtn = loaded ? <button onClick={reset}>Reload</button> : null;

  return (
    <div id={styles.MyContainer}>
      <h1> test container component</h1>

      <MyBar now={progress} variant="determinate" color="primary" />
      <br />
      <img
        id="imgFetched"
        width="900px"
        src="https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg"
      />
      <br />
      {reloadBtn}
    </div>
  );
}

//ReactDOM.render(<Test />, document.querySelector("#test"));
