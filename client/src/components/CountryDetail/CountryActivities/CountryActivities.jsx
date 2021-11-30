import React from "react";
import ActivitySeasons from "../ActivitySeasons/ActivitySeasons";

import styles from './CountryActivities.module.css'

const CountryActivities = ({activities}) => {
    console.log('activities',activities)
  return (
    <div className={styles.countryActivitiesList}>
      {activities &&
        activities.map((activiti) => {
          return (
            <div className={styles.countryActivitiesDetail}>
              <span>Actividad: {activiti.name}</span>
              <span>Dificultad: {activiti.difficulty}</span>
              <span>Duración: {activiti.duration} hs.</span>
              <ActivitySeasons seasons = {activiti.seasons}/>
            </div>
          );
        })}
    </div>
  );
};

export default CountryActivities;