import React from "react";

import styles from "./SelectDifficulty.module.css";

const SelectDifficulty = ({ handleChangeIntegrated }) => {
  const difficultyRange = [
    "Principiante",
    "Aficionado",
    "Normal",
    "Profesional",
    "Experto",
  ];

  return (
    <div className={styles.activityDifficulty}>
      <label>Dificultad: </label>
      {difficultyRange.map((element) => {
        return (
          <label key = {'selectDiffLabel'+element}>
            <input
            key = {'selectDiff'+element}
              type="radio"
              id={element}
              name="difficulty"
              value={element}
              onChange={(e) => handleChangeIntegrated(e)}
            />
            {element}
          </label>
        );
      })}
    </div>
  );
};

export default SelectDifficulty;
