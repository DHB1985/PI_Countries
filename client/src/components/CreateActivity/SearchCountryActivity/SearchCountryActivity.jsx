// src/components/Search.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        <div>
          {filteredCountries.map((element) => (
            <ul>
              {console.log(element)}
              <button
                onClick={(e) => handleSelectCountries(e)}
                value={element.id}
                key={element.id}
              >
                <img
                  src={element.imgflag}
                  alt="Img not found"
                  width="10px"
                  height="10px"
                />{" "}
                {element.name}
              </button>
            </ul>
          ))}
        </div>
      );
    }
  }

  return (
    <section>
      <div>
        <h2>Search your course</h2>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search People"
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
};

export default SearchCountryActivity;
