import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/index";

const CountryDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch]);

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
          {country.activities &&
            country.activities.map((activiti) => {
              console.log("country L28", activiti);
              return (
                <div>
                  <div>Actividad: {activiti.name}</div>
                  <div>Dificultad: {activiti.difficulty}</div>
                  <div>Duración: {activiti.duration} hs.</div>
                  {activiti.seasons &&
                    activiti.seasons.map((season) => {
                      return (
                        <div>
                          <div>{season.name}</div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
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
