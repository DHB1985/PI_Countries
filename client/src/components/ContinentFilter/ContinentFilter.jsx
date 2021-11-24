import React from "react";
import { useDispatch } from "react-redux";
import { filterCountriesByContinent } from "../../redux/actions";

const ContinentFilter = ({setCurrentPage}) => {
  const dispatch = useDispatch();

  //Funcion para ejecutar el filtrado por continente

  const handleFilterContinent = (event) => {
    dispatch(filterCountriesByContinent(event.target.value));
    setCurrentPage(1)
    event.preventDefault();
  };
  

  return (
    <div>
      {/* Filtrado por Continente */}
      <select onChange={(event) => handleFilterContinent(event)}>
        <option value="All">Todos</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
        <option value="Antartica">Oceania</option>
      </select>
    </div>
  );
};

export default ContinentFilter;
