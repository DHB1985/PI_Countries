import React from "react";
import { Link } from "react-router-dom";

//Importacion de estilos
import styles from "./Card.module.css";

const CountryCard = ({ imgflag, name, continent, population, id }) => {
  return (
    <div className={styles.cardBox}>
      <div className={styles.imgFlagBox}>
        <img src={imgflag} alt="Not Found" className={styles.imgFlag} />
      </div>
      <div className={styles.dataContent}>
        <Link to={`/home/${id}`}>
          <label>{name}</label>
        </Link>
        <div className={styles.cardInfo}>
          <label>Continente: {continent}</label> 
          {/* <label> </label>  */}
          <label>Población:</label> 
          <label>{population} hab.</label> 
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
