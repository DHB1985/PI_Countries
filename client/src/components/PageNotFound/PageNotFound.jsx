import React from "react";
import { Link } from "react-router-dom";

import styles from './PageNotFound.module.css'
const PageNotFound = () => {

return (
    <div className={styles.pageNotFound}>
        <span>
            Error 404 Page not found
        </span>
        <Link to="/home">HOME</Link>
    </div>
)
}

export default PageNotFound;