import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { filterCountriesByContinent } from "../../redux/actions";

//Importacion de estilos
import styles from "./ContinentFilter.module.css";

const ContinentFilter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const continentsList = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
  ];
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
    let updateCheckedState = [
      ...filterContinent.map((element, index) =>
        index === parseInt(event.target.id) ? !element : element
      ),
    ];
    setFilterContinent(updateCheckedState);

    let statusFilter = continentsList.filter((element, index) => {
      if (updateCheckedState[index] === true) return element;
    });

    dispatch(filterCountriesByContinent(statusFilter));
    setCurrentPage(1);
  };

  return (
    <div className={styles.filterContinent}>
      {/* Filtrado por Continente */}
      <h4>Filtrado por continente</h4>
      {continentsList.map((element, index) => {
        return (
          <div key={"div" + index}>
            <label key={"label" + index}>
              <input
                key={"input" + index}
                type="checkbox"
                id={index}
                name={element}
                value={element}
                checked={filterContinent[index]}
                onChange={(e) => handleFilterContinent(e)}
              />
              {element}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ContinentFilter;
