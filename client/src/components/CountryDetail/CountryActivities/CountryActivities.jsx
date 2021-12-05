import React from "react";
import ActivitySeasons from "../ActivitySeasons/ActivitySeasons";

import styles from './CountryActivities.module.css'

const CountryActivities = ({activities}) => {
  
  return (
    <div className={styles.countryActivitiesList}>
      {activities &&
        activities.map((activity) => {
          return (
            <div key={activity.id} className={styles.countryActivitiesDetail}>
              <span>Actividad: {activity.name}</span>
              <span>Dificultad: {activity.difficulty}</span>
              <span>Duración: {activity.duration} hs.</span>
              <ActivitySeasons seasons = {activity.seasons}/>
            </div>
          );
        })}
    </div>
  );
};

export default CountryActivities;