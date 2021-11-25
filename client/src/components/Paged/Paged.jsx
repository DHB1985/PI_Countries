import React from "react";

const Paged = ({ countriesPerPage, allCountries, paged }) => {
  let pageNumbers = [];
 if (Array.isArray(allCountries)){
  for (let i = 1; i <= Math.ceil(allCountries.length / countriesPerPage); i++) {
    pageNumbers = [...pageNumbers, i];
  }} else {pageNumbers = [1]}

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <a
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
