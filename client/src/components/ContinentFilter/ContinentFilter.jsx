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
  //console.log(filterContinent)
  // const [localState, setLocalState] = useState(false)
  //let updateCheckedState =[];
  
  //Funcion para ejecutar el filtrado por continente
  
  const handleFilterContinent = (event) => {
    let updateCheckedState = [ ...filterContinent.map((element, index) =>
      index === parseInt(event.target.id) ? !element : element
      )];
      setFilterContinent(updateCheckedState);
      // setLocalState(!localState)
      event.preventDefault();
      let statusFilter = {
        checked: event.target.checked,
        value: event.target.value,
      };
      dispatch(filterCountriesByContinent(statusFilter));
      setCurrentPage(1);
      console.log(filterContinent)
    };
    
    // useEffect(() => {
    //   console.log(localState)
    //   console.log(filterContinent)
    //   setFilterContinent(updateCheckedState)
    // }, [localState]);
    
    return (
    <div className={styles.filterContinent}>
      {/* Filtrado por Continente */}
      <h4>Filtrado por continente</h4>
      {continentsList.map((element, index) => {
        return (
          <form key={'div'+index}>
            <input
            key={index}
              type="checkbox"
              id={index}
              name={element}
              value={element}
              checked={filterContinent[index]}
              onClick={(event) => handleFilterContinent(event)}
            />
            <label for={element} key={'label'+index}>{element}</label>
          </form>
        );
      })}
    </div>
  );
};

export default ContinentFilter;
