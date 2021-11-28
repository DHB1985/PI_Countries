import React from "react";

const Paged = ({ countriesPerPage, allCountries, paged }) => {
  let pageNumbers = [];
  let resto = 0;
 //para saber la cantidad de paginas es ((paisesActuales-9)/10)+1 eso va dentro del Math.ceil
 //el -9 es por los 9 paises de la página 1, el /10 es por la cantidad de países por página a partir
 //la cuenta esa nos va a dar la cantidad de páginas a partir de la segunda inclusive. Y luego le sumo 1 
 //por la primer página.
  if (Array.isArray(allCountries)){
    if(allCountries.length === 250) {resto = 2}
  for (let i = 1; i <= Math.ceil(((allCountries.length-9) / (countriesPerPage+1)))+1; i++) { 
        pageNumbers = [...pageNumbers, i];
  }} else {pageNumbers = [1]}
  

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <a key={"paged"+num}
              onClick={() => {
                paged(num);
              }}
            >
              {" "}
              {num}{" "}
            </a>
          ))}
      </ul>
    </nav>
  );
};

export default Paged;
