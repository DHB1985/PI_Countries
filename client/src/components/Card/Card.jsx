import React from "react";
import { Link } from "react-router-dom";

//Importacion de estilos
import styles from "./Card.module.css";

const CountryCard = ({ imgflag, name, continent, population, id }) => {
  return (
        <Link to={`/home/${id}`} className={styles.cardBox}>
    {/* <div className={styles.cardBox}> */}
      <div className={styles.imgFlagBox}>
        <img src={imgflag} alt="Not Found" className={styles.imgFlag} />
      </div>
      <div className={styles.dataContent}>
          <label>{name}</label>
        <div className={styles.cardInfo}>
          <label>Continente: {continent}</label> 
          {/* <label> </label>  */}
          <label>Población:</label> 
          <label>{population} hab.</label> 
        </div>
      </div>
    {/* </div> */}
        </Link>
  );
};

export default CountryCard;
