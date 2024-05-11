import React, { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [value, setValue] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const onInputButtonClick = () => {
    let promptValue = prompt("Введите значение");
    if (promptValue && promptValue.length < 3) {
      setError("Введенное значение должно содержать минимум 3 символа");
    } else if (promptValue && promptValue.length > 3) {
      setError("");
      setValue(promptValue);
      setIsValueValid(promptValue.length >= 3);
    } else {
      setError("");
      setValue("");
    }
  };

  const onAddButtonClick = () => {
    if (!value || value.length < 3) {
      setError("Нельзя добавить в список значение меньше 3 символов");
      return;
    }

    let id = Date.now();
    const updatedList = [...list, { id, value }];
    setList(updatedList);
    setValue("");
    setIsValueValid(false);
    setError("");
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.pageHeading}>Ввод значения</h1>
      <p className={styles.noMarginText}>
        Текущее значение <code>value</code>: "
        <output className={styles.currentValue}>{value}</output>"
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          onClick={onAddButtonClick}
          disabled={!isValueValid}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles.listContainer}>
        <h2 className={styles.listHeading}>Список:</h2>
        {list.length === 0 ? (
          <p>Нет добавленных элементов</p>
        ) : (
          <ul className={styles.list}>
            {list.map(({ id, value }) => (
              <li key={id} className={styles.listItem}>
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
