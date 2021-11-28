import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterCountriesByContinent } from "../../redux/actions";

//Importacion de estilos
import styles from "./ContinentFilter.module.css";

const ContinentFilter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [filterContinent, setFilterContinent] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //Funcion para ejecutar el filtrado por continente

  const handleFilterContinent = (event) => {

    const updateCheckedState = filterContinent.map((element, index) =>
      index === parseInt(event.target.id) ? !element : element
    );
    event.preventDefault();
    let statusFilter = {
      checked: event.target.checked,
      value: event.target.value,
    };
    dispatch(filterCountriesByContinent(statusFilter));
    setCurrentPage(1);
    setFilterContinent(updateCheckedState);

  };

  return (
    <div className={styles.filterContinent}>
      {/* Filtrado por Continente */}

      <label>
        <input
          type="checkbox"
          id="0"
          name="Africa"
          value="Africa"
          checked={filterContinent[0]}
          onChange={(event) => handleFilterContinent(event)}
        />
        Africa
      </label>
      <label>
        <input
          type="checkbox"
          id="1"
          name="Americas"
          value="Americas"
          checked={filterContinent[1]}
          onChange={(event) => handleFilterContinent(event)}
        />
        America
      </label>
      <label>
        <input
          type="checkbox"
          id="2"
          name="Asia"
          value="Asia"
          checked={filterContinent[2]}
          onChange={(event) => handleFilterContinent(event)}
        />
        Asia
      </label>
      <label>
        <input
          type="checkbox"
          id="3"
          name="Europe"
          value="Europe"
          checked={filterContinent[3]}
          onChange={(event) => handleFilterContinent(event)}
        />
        Europa
      </label>
      <label>
        <input
          type="checkbox"
          id="4"
          name="Oceania"
          value="Oceania"
          checked={filterContinent[4]}
          onChange={(event) => handleFilterContinent(event)}
        />
        Oceania
      </label>
      <label>
        <input
          type="checkbox"
          id="5"
          name="Antarctic"
          value="Antarctic"
          checked={filterContinent[5]}
          onChange={(event) => handleFilterContinent(event)}
        />
        Antartida
      </label>
    </div>
  );
};

export default ContinentFilter;
