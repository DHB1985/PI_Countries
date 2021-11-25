import React from "react";
import ActivitySeasons from "../ActivitySeasons/ActivitySeasons";

const CountryActivities = ({activities}) => {
    console.log('activities',activities)
  return (
    <div>
      {activities &&
        activities.map((activiti) => {
          return (
            <div>
              <div>Actividad: {activiti.name}</div>
              <div>Dificultad: {activiti.difficulty}</div>
              <div>Duración: {activiti.duration} hs.</div>
              <ActivitySeasons seasons = {activiti.seasons}/>
            </div>
          );
        })}
    </div>
  );
};

export default CountryActivities;