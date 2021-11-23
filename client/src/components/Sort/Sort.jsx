import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByCountryName,
  orderByCountryPopulation,
} from "../../redux/actions";

const CountrySort = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();

  //Funcion para ejecutar el ordenamiento por nombre

  const handleOrderByName = (event) => {
    dispatch(orderByCountryName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    event.preventDefault();
  };

  //Funcion para ejecutar el ordenamiento por poblacion
  const handleOrderByPopulation = (event) => {
    dispatch(orderByCountryPopulation(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    event.preventDefault();
  };

  return (
    <div>
      {/* Orden Ascendente/Descendente por nombre*/}
      <div>
        <select onChange={(event) => handleOrderByName(event)}>
          <option value="ascendName">Ascendente</option>
          <option value="descendName">Descendente</option>
        </select>
      </div>

      {/* Orden Ascendente/Descendente por cantidad de poblacion*/}
      <div>
        <select onChange={(event) => handleOrderByPopulation(event)}>
          <option value="ascendPob">Pob. Ascendente</option>
          <option value="descendPob">Pob. Descendente</option>
        </select>
      </div>
    </div>
  );
};

export default CountrySort;
