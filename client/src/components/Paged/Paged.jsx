import React from "react";

const Paged = ({ countriesPerPage, allCountriesLength, paged }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountriesLength / countriesPerPage); i++) {
    pageNumbers = [...pageNumbers, i];
    
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li>
              <a onClick={() => {paged(num)}}>
                {num}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paged;