import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/index";
import CountryActivities from "./CountryActivities/CountryActivities";

const CountryDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch]);
  console.log('props ', props)

  const country = useSelector((state) => state.countryDetail);
  if (country.id) {
    return (
      <div>
        <h1>{country.name}</h1>
        <img src={country.imgflag} alt="Img not found" />
        <div>Continente: {country.continent}</div>
        <div>Subcontinente: {country.subregion}</div>
        <div>Capital: {country.capital}</div>
        <div>Población: {country.population}</div>
        <div>Área: {country.area}</div>
        <div>
          <CountryActivities activities={country.activities} />
        </div>
        <Link to="/home">HOME</Link>
      </div>
    );
  } else {
    return (
      <div>
        Page Not Found
        <Link to="/home">HOME</Link>
      </div>
    );
  }
};

export default CountryDetail;
