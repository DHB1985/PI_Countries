import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { Link } from "react-router-dom";
import CountryCard from "../Card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  },[]);

  const handleClick = (event) => {
      dispatch(getCountries());
    event.preventDefault();
  };


  return (
    <div>
      <h2>Welcome to Countrie App</h2>
      <Link to="/activity">Crear actividad Turística</Link>
      <button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Volver a Cargar
      </button>

      {/* Orden Ascendente/Descendente por nombre*/}
      <div>
        <select>
          <option value="ascend">Ascendente</option>
          <option value="descend">Descendente</option>
        </select>
      </div>

      {/* Orden Ascendente/Descendente por cantidad de poblacion*/}
      <div>
        <select>
          <option value="ascendPob">Pob. Ascendente</option>
          <option value="descendPob">Pob. Descendente</option>
        </select>
      </div>

      {/* Filtrado por Continente */}
      <div>
        <select>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europa">Europa</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {/* Filtrado por Actividad */}
      <div>
        <select>
          <option value="all">Todas</option>
          <option value="actividad1">actividad1</option>
          <option value="actividad2">actividad2</option>
          <option value="actividad3">actividad3</option>
          <option value="actividad4">actividad4</option>
        </select>
      </div>
        
      {/* Mapeo de las cards del pais */}
      <div>
        {allCountries.data &&
          allCountries.data.map((country) => {
           return <CountryCard
              imgflag={country.imgflag}
              name={country.name}
              continent={country.continent}
              population={country.population}
            />;
          })}
      </div>
    </div>
  );
};

export default Home;
