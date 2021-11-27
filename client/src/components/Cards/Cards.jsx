import React from "react";
import CountryCard from "../Card/Card";

//Importacion de estilos
import styles from "./Cards.module.css"

const CountriesCards = ({ currentCountries }) => {
  return (
    <div className={styles.cardsBox}>
      {/* Mapeo de las cards del pais */}

      {!Array.isArray(currentCountries)
        ? currentCountries
        : currentCountries.map((country) => {
            return (
              <CountryCard
                imgflag={country.imgflag}
                name={country.name}
                continent={country.continent}
                population={country.population}
                id={country.id}
                key = {"Card"+country.id}
              />
            );
          })}
    </div>
  );
};

export default CountriesCards;
