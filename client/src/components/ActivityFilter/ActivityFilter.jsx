import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountriesByActivity } from "../../redux/actions";

const ActivityFilter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const allActivities = useSelector((state) => state.activitiesNamesId);

  //Funcion para ejecutar el filtrado por Actividad

  const handleFilterActivity = (event) => {
    if (event.target.checked) {
      dispatch(filterCountriesByActivity(event.target.value));
      setCurrentPage(1);
    }
    event.preventDefault();
  };

  return (
    <div>
      {/* Filtrado por Actividad */}
      <div>
        <p>Actividades:</p>
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
        {allActivities &&
          allActivities.map((elem) => {
            return (
              <label>
                <input
                  type="radio"
                  id={elem.id}
                  name="activity"
                  value={elem.id}
                  onChange={(e) => handleFilterActivity(e)}
                />
                {elem.name}
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default ActivityFilter;
