import React from "react";

const ContinentFilter = ({ handleFilterContinent }) => {
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
      </select>
    </div>
  );
};

export default ContinentFilter;
