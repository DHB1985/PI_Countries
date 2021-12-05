import React from "react";

import styles from './ActivityErrors.module.css'

const ErrorsList = ({ errors }) => {
 return ( <div className={styles.errorsList}>
    <label>Errores</label>
    {errors &&
      errors.map((element) => {
       return ( <label  key={'errorListLabel'+element}>{element}</label>)
      })}
  </div>)
};

export default ErrorsList

