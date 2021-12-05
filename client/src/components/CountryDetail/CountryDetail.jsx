import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/index";
import CountryActivities from "./CountryActivities/CountryActivities";

import styles from "./CountryDetail.module.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import loadingIMG from '../../img/GIF_Mundo_Banderas.gif'
const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let country = ''

  
  useEffect(async () => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);
  
  country= useSelector((state) => state.countryDetail);
  
  if (country !== "País no encontrado") {
    if (Object.keys(country).length === 0){
      return (<img src={loadingIMG} alt="" width = "20%" height = "20%"/>)
    } else {
    return (
      <div className={styles.countryDetailBox}>
        <div className={styles.countryDetailTitleBox}>
          <Link to="/home">
            <button>HOME</button>
          </Link>

          <h1>{country.name}</h1>
        </div>
        <div className={styles.flagData}>
          <div className={styles.imgFlagDiv}>
            <img
              className={styles.imgFlag}
              src={country.imgflag}
              alt="Img not found"
            />
          </div>
          <div className={styles.data}>
            <span>Continente: {country.continent}</span>
            <span>Subcontinente: {country.subregion}</span>
            <span>Capital: {country.capital}</span>
            <span>Población: {country.population}</span>
            <span>Área: {country.area}</span>
          </div>
        </div>
        <div className={styles.contryDetailActivities}>
          <CountryActivities activities={country.activities} />
        </div>
      </div>
    );}
  } else {
    return <PageNotFound />;
  }
};

export default CountryDetail;
