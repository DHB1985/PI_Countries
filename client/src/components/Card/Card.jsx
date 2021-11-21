import React from "react";

const CountryCard = ({ imgflag, name, continent, population }) => {
  return (
    <div>
      <img src={imgflag} alt="Image not Found" />
      <p>Nmae: {name}</p>
      <p>Continente: {continent}</p>
      <p>Población: {population}</p>
    </div>
  );
};

export default CountryCard;
