import React from "react";
import { Link } from "react-router-dom";
import loadingIMG from "../../img/GIF_Mundo_Banderas.gif";
import styles from './PageNotFound.module.css'
const PageNotFound = () => {

return (
    <div className={styles.pageNotFound}>
        <img src={loadingIMG} alt=""  />
        <span>
            Error 404 Page not found
        </span>
        <Link to="/home"><button>HOME</button></Link>
    </div>
)
}

export default PageNotFound;