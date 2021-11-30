import React from "react";
//import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  // let [country, setCountry] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    //setCountry(event.target.value);
    dispatch(getCountryByName(event.target.value));
  };

  // const handleSubmit = (event) => {
  //   dispatch(getCountryByName(country));
  //   event.preventDefault();
  // };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar País..."
        onChange={(event) => handleInputChange(event)}
      />
      {/* <button type="submit" onClick={(event) => handleSubmit(event)}>
        Buscar
      </button> */}
    </div>
  );
};

export default SearchBar;
