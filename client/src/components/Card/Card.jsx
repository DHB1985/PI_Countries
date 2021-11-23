import React from "react";

const CountryCard = ({ imgflag, name, continent, population }) => {
  return (
    <div>
      <img src={imgflag} alt="Not Found" />
      <p>Name: {name}</p>
      <p>Continente: {continent}</p>
      <p>Población: {population}</p>
    </div>
  );
};

export default CountryCard;
