import React from "react";

import styles from "./SelectSeason.module.css";

const SelectSeason = ({ handleCheckSeason }) => {
  const seasonsList = ["Otoño", "Invierno", "Primavera", "Verano"];

  return (
    <div className={styles.activitySeason}>
      <label>Temporada: </label>
      {seasonsList.map((element) => {
        return (
          <label  key = {'selectSeasonLabel'+element}>
            <input
              key={'selectSeason'+element}
              type="checkbox"
              id={element}
              name="season"
              value={element}
              onChange={(e) => handleCheckSeason(e)}
            />
            {element}
          </label>
        );
      })}
    </div>
  );
};

export default SelectSeason;
