import styles from "./blank.module.css";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import MyBar from "./myBar.js";

const debounce = (func, delay) => {
  // обычный дебаунс. Используем в последнюю очередь. Прогресс-бар без него резко дергаться. Используем чтобы пропускать обновления.
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function Test() {
  const [progress, setProgress] = useState(70);

  const skipUpdate = null; // здесь в последнюю очередь будет функция-обертка для дебаунса и функции обновления состоянии прогресс-бара.

  // картинка "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg"

  const downloadFile = url => {
    // Симулируем загрузку картинки чтобы вмешаться в процесс и показывать прогресс загрузки.
    // Сделаем запрос по адресу картинки, загрузим ответ как бинарный объект blob (Binary Large OBject).
    //
    // Через fetch слишком низкоуровневый код, используем популярную библиотеку axios (функция, как fetch). Ей для запроса передаем url
    // и объект с такими настройками (конкретные свойств взяты из документации axios, или гугл):

    // responseType: "blob",
    // onDownloadProgress: progressEvent => {
    //   let percentCompleted = Math.floor(
    //     (progressEvent.loaded / progressEvent.total) * 100
    //
    //           ...   обновляем прогресс бар, через состояние.
    //
    //   );

    // отловить (catch) ошибки загрузки в консоль.

    const reader = new window.FileReader();
    reader.readAsDataURL(response.data); // к ответу (response - твоя переменная из запроса) цепляем специальный объект FileReader.
    reader.onload = () => {
      // FileReader используют еще когда делают Upload файлов на сайт.
      document.getElementById("imgFetched").src = reader.result;
    };
    ///  - загрузку сначала сделаем через кнопку Reload. Она напрямую запускает downloadFile(url)
    ///  - вторым этапом (когда уже все работает) настроим логику состояния, использовать хук useEffect чтобы в начале кнопки не было, downloadFile(url)
    ///  запускался при первом рендере этого компонента (Blank)
  };

  const reset = () => {
    setProgress(0);
  };

  const reloadBtn = <button onClick={reset}>Reload</button>;

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

ReactDOM.render(<Test />, document.querySelector("#test")); /// когда все готово, убираем здесь рендер, интегрируем
// компонент в приватную секцию проекта отдельным роутом (чтобы или Галлерея или этот компонент, но все через логин)
