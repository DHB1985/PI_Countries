import React from "react";

const CountrySort = ({ handleOrderByName, handleOrderByPopulation}) => {
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



