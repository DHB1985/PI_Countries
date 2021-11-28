import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByCountryName,
 // orderByCountryPopulation,
} from "../../redux/actions";
import { useState } from "react";

const CountrySort = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();

  const [orderContinent, setOrderContinent] = useState([
    false,
    false,
    false,
    false,
  ]);
  //Funcion para ejecutar el ordenamiento por nombre

  const handleOrder = (event) => {
    const updateCheckedState = orderContinent.map((element, index)=> index === parseInt(event.target.id)?!element:false)
    setOrderContinent(
      updateCheckedState
    );
    dispatch(orderByCountryName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    event.preventDefault();
  };

  //Funcion para ejecutar el ordenamiento por poblacion
  // const handleOrderByPopulation = (event) => {
  //   dispatch(orderByCountryPopulation(event.target.value));
  //   setCurrentPage(1);
  //   setOrden(`Ordenado ${event.target.value}`);
  //   event.preventDefault();
  // };

  return (
    <div>
      {/* Orden Ascendente/Descendente por nombre*/}
      <div>
      
        <label>
          <input
            type="radio"
            id="0"
            name="ascendName"
            value="ascendName"
            checked={orderContinent[0]}
            onChange={(event) => handleOrder(event)}
          />
          Ascendente
        </label>

        <label>
          <input
            type="radio"
            id="1"
            name="descendName"
            value="descendName"
            checked={orderContinent[1]}
            onChange={(event) => handleOrder(event)}
          />
          Descendente
        </label>

        {/* Orden Ascendente/Descendente por cantidad de poblacion*/}

        <label>
          <input
            type="radio"
            id="2"
            name="ascendPob"
            value="ascendPob"
            checked={orderContinent[2]}
            onChange={(event) => handleOrder(event)}
          />
          Pob. Ascendente
        </label>
        <label>
          <input
            type="radio"
            id="3"
            name="descendPob"
            value="descendPob"
            checked={orderContinent[3]}
            onChange={(event) => handleOrder(event)}
          />
          Pob. Descendente
        </label>
    
      </div>
    </div>
  );
};

export default CountrySort;
