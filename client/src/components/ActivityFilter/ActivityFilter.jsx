import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountriesByActivity } from "../../redux/actions";

//Importacion de estilos
import styles from "./ActivityFilter.module.css";

const ActivityFilter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const allActivities = useSelector((state) => state.activitiesNamesId);

  //Funcion para ejecutar el filtrado por Actividad

  const handleFilterActivity = (event) => {
    if (event.target.checked) {
      dispatch(filterCountriesByActivity(event.target.value));
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.activityFilterList}>
      {/* Filtrado por Actividad */}

      <h4>Filtrado por Actividades</h4>
      <div>
        <label>
          <input
            type="radio"
            id="All"
            name="activity"
            value="All"
            onChange={(e) => handleFilterActivity(e)}
          />
          All Countries
        </label>
      </div>
      {allActivities &&
        allActivities.map((elem) => {
          return (
            <div>
              <label key={"activityFilter" + elem.id}>
                <input
                  type="radio"
                  id={elem.id}
                  name="activity"
                  value={elem.id}
                  onChange={(e) => handleFilterActivity(e)}
                />
                {elem.name}
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default ActivityFilter;
