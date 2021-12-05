import React from "react";

//Importacion de estilos
import styles from "./Sort.module.css";

const CountrySort = ({ setCurrentPage, setFilterState, filterState }) => {
  const sortedList = ["ascendName", "descendName", "ascendPob", "descendPob"];
  const sortedLabelName = [
    "Nombre Ascendente",
    "Nombre Descendente",
    "Poblac. Ascendente",
    "Poblac. Descendente",
  ];

  //Funcion para ejecutar el ordenamiento por nombre

  const handleOrder = (event) => {
    setFilterState({ ...filterState, sort: event.target.value });

    setCurrentPage(1);
  };

  return (
    <div className={styles.sortContinent}>
      {/* Orden Ascendente/Descendente por nombre*/}
      {/* Orden Ascendente/Descendente por cantidad de poblacion*/}
      <h4>Orden</h4>
      <div key={"sortContinet"}>
        <select onChange={(event) => handleOrder(event)}>
          <option key={"sortContinent Orden"} value="Orden">
            Orden...
          </option>
          {sortedList.map((element, index) => {
            return (
              <option key={"activityFilter" + element} value={element}>
                {sortedLabelName[index]}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default CountrySort;
