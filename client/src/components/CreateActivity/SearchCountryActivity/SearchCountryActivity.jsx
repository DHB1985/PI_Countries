// src/components/Search.js

import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from './SearchCountryActivity.module.css'

const SearchCountryActivity = ({ handleSelectCountries }) => {
  const countries = useSelector((state) => state.allCountries);

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().startsWith(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <div className={styles.countriesListBtn}>
          {filteredCountries.map((element) => (
           
              <button
                onClick={(e) => handleSelectCountries(e)}
                value={element.name}
                name={element.imgflag}
                id={element.id}
                key={element.id}
              >
                <img
                  src={element.imgflag}
                  alt="Img not found"
                  width="15px"
                  height="15px"
                />{" "}
                {element.name}
              </button>
 
          ))}
        </div>
      );
    }
  }

  return (
    <section className={styles.searchBar}>
      <div>
        <h4>Busqueda de países</h4>
      </div>
      <div>
        <input
          type="search"
          id='SearchInput'
          placeholder="Buscar países.."
          onChange={handleChange}
        />
      {searchList()}
      </div>
    </section>
  );
};

export default SearchCountryActivity;
