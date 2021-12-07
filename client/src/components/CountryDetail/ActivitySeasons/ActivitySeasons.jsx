import React from "react";

import styles from './ActivitySeasons.module.css'

const ActivitySeasons = ({ seasons }) => {
  return (
    <div className={styles.seasonsList}>
      <span>Temporadas:</span>
      {seasons &&
        seasons.map((season, index) => {
          return (
     
              <span key= {season.name + index}>{season.name}</span>
         
          );
        })}
    </div>
  );
};

export default ActivitySeasons;
