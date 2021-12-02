import React from "react";
import styles from "./Paged.module.css";

const Paged = ({ countriesPerPage, allCountries, paged, currentPage }) => {
  let pageNumbers = [];
  let resto = 0;
  //para saber la cantidad de paginas es ((paisesActuales-9)/10)+1 eso va dentro del Math.ceil
  //el -9 es por los 9 paises de la página 1, el /10 es por la cantidad de países por página a partir
  //la cuenta esa nos va a dar la cantidad de páginas a partir de la segunda inclusive. Y luego le sumo 1
  //por la primer página.
  if (Array.isArray(allCountries)) {
    if (allCountries.length === 250) {
      resto = 2;
    }
    for (
      let i = 1;
      i <= Math.ceil((allCountries.length - 9) / (countriesPerPage + 1)) + 1;
      i++
    ) {
      pageNumbers = [...pageNumbers, i];
    }
  } else {
    pageNumbers = [1];
  }

  
  if (pageNumbers.length > 1) {
    return (
      <div className={styles.pageNav}>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <button
              key={"paged" + num}
              onClick={() => {
                paged(num);
              }}
              value = {num}
              className = {currentPage === num? styles.btnPage:''}
            >
              {" "}
              {num}{" "}
            </button>
          ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Paged;
