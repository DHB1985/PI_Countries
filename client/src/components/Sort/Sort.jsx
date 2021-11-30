import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByCountryName,
  // orderByCountryPopulation,
} from "../../redux/actions";
import { useState } from "react";

//Importacion de estilos
import styles from "./Sort.module.css";

const CountrySort = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();
  const sortedList = ["ascendName", "descendName", "ascendPob", "descendPob"];
  const sortedLabelName = [
    "Nombre Ascendente",
    "Nombre Descendente",
    "Poblac. Ascendente",
    "Poblac. Descendente",
  ];
  const [orderContinent, setOrderContinent] = useState([
    false,
    false,
    false,
    false,
  ]);
  //Funcion para ejecutar el ordenamiento por nombre

  const handleOrder = (event) => {
    const updateCheckedState = orderContinent.map((element, index) =>
      index === parseInt(event.target.id) ? !element : false
    );
    setOrderContinent(updateCheckedState);
    dispatch(orderByCountryName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
  };

  //Funcion para ejecutar el ordenamiento por poblacion
  // const handleOrderByPopulation = (event) => {
  //   dispatch(orderByCountryPopulation(event.target.value));
  //   setCurrentPage(1);
  //   setOrden(`Ordenado ${event.target.value}`);
  //   event.preventDefault();
  // };

  return (
    <div className={styles.sortContinent}>
      {/* Orden Ascendente/Descendente por nombre*/}
      {/* Orden Ascendente/Descendente por cantidad de poblacion*/}
      <h4>Orden</h4>
      {sortedList.map((element, index) => {
        return (
          <div>
            <label>
              <input
                type="radio"
                id={index}
                name={element}
                value={element}
                checked={orderContinent[index]}
                onChange={(event) => handleOrder(event)}
              />
              {sortedLabelName[index]}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CountrySort;
