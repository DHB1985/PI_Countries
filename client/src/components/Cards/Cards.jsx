import React from "react";
import CountryCard from "../Card/Card";

const CountriesCards = ({currentCountries}) => {
  return (
    <div>
      {/* Mapeo de las cards del pais */}
      {currentCountries &&
        currentCountries.map((country) => {
          return (
            <CountryCard
              imgflag={country.imgflag}
              name={country.name}
              continent={country.continent}
              population={country.population}
            />
          );
        })}
    </div>
  );
};

export default CountriesCards;