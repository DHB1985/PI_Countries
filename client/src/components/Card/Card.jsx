import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ imgflag, name, continent, population, id }) => {
  return (
    <div>
      <img src={imgflag} alt="Not Found" />

      <Link to={`/home/${id}`}>
        <span>Name: {name}</span>
      </Link>

      <p>Continente: {continent}</p>
      <p>Población: {population}</p>
    </div>
  );
};

export default CountryCard;
