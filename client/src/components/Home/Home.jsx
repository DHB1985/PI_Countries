import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivitiesList,
  allFilters,
} from "../../redux/actions";
import { Link } from "react-router-dom";

//Importacion de estilos
import styles from "./Home.module.css";

//Importación de componentes

import CountriesCards from "../Cards/Cards";
import CountrySort from "../Sort/Sort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import SearchBar from "../SearchBar/SearchBar";
import ActivityFilter from "../ActivityFilter/ActivityFilter";

//Importacion del Paginado
import Paged from "../Paged/Paged";

import loadingIMG from "../../img/GIF_Mundo_Banderas.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }, [dispatch]);

  //Estado local para los filtros
  const [filterState, setFilterState] = useState({
    continent: [],
    sort: "Orden",
    activity: "All",
    countrySearch: "",
  });

  useEffect(() => {
    setLoading((loading)=>!loading);
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  const handleClick = (event) => {
    dispatch(getCountries());
    window.location.reload();
  }; //Funcion para resetear el State, para que vuelva a traer todos los países

  // Estados locales para setear el paginado
  const [currentPage, setCurrentPage] = useState(1); //Setea la página actual en 1
  const countriesPerPage = 9; // Setea la cantidad de paises por pagina
  let indFirstCountry = 0; //Para restar al primer indice de los paises despues de la pag 1
  let indLastCountry = 0; //Para restar al ultimo indice de los paises despues de la pag 1
  //Este if es para mostrar 9 en la primer página, si no es la primera va a valer 0, entonces va a mostrar 10
  //Este if es para restar y sumar en los indices para el slice para ir manteniendo las paginas y que en la
  //primera muestre 9 y de ahi en adelante muestre 10.
  /*
Paginas               1     2      3      4     5
indexOfFirstCountry   0     9      1     27    36
indexOfLastCountry    9     17     27     36    45
Como el slice saca uno menos del segundo argumento por eso el final de uno es el inicio del otro
La tabla para obtener 9 en el primero y 10 a partir de la segunda deberia ser
Paginas               1     2      3      4     5
indexOfFirstCountry   0     9      18     27    36
indexOfLastCountry    8     17     26     35    44
Como a partir de la segunda pagina tienen que ser 10 países por página, los indices deberian ser
Paginas               1     2      3      4     5
indexOfFirstCountry   0     9      19     29    39
indexOfLastCountry    8     18     28     38    48
Si se saca la diferencia entre las do ultimas tablas
Paginas                  1     2      3      4     5
difindexOfFirstCountry   0     0      1      2     3
difindexOfLastCountry    0     1      2      3     4
Sacando la serie a partir de la pagina 2 al indexOfFirstCountry hay que sumarle el numero de la pagina actual - 2 
(indFirstCountry =currentPage - 2;)
Sacando la serie a partir de la pagina 2 al difindexOfLastCountry hay que sumarle el numero de la pagina actual - 1 
(indLastCountry = currentPage - 1;)
  */
  if (currentPage === 1) {
    indFirstCountry = 0;
    indLastCountry = 0;
  } else {
    indFirstCountry = currentPage - 2;
    indLastCountry = currentPage - 1;
  }
  const indexOfLastCountry = currentPage * countriesPerPage; //Para setear el el índice del último país en la pagina actual
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // Para setear el índice del primer paíes ne la página

  const currentCountries = !allCountries.length >0
    ? []
    : allCountries.slice(
        indexOfFirstCountry + indFirstCountry,
        indexOfLastCountry + indLastCountry
      ); //deja solo la cantidad de países que necesito en cada página
console.log('array current countries',currentCountries )


  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //Setea el número de la página a mostrar
  //Final de las funciones de paginado


  //funcion loading

  const [loading, setLoading] = useState(false);
  console.log('show ', show)
  useEffect(() => {
    setShow((show)=>!show);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);



  return (
    <div className={styles.homeBox}>
      <div className={styles.homeTitleBox}>
        <div className={styles.buttonReset}>
          <button
            onClick={(event) => {
              handleClick(event);
            }}
          >
            Volver a Cargar
          </button>
        </div>

        <div className={styles.titleH2}>
          <h2>Welcome to Countrie App</h2>
        </div>
        {/* SearchBar */}
        <div className={styles.searchCreateAct}>
          <SearchBar
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          <Link to="/activity">
            <button>Crear actividad Turística</button>
          </Link>
        </div>
      </div>

      <div className={styles.homeContentBox}>
        <div className={styles.leftMenu}>
          {/* Filtrado por Continente */}

          <ContinentFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          {/* Orden alfabetico o por poblacion ascendente o descendente */}

          <CountrySort
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
        </div>

        <div className={styles.dataCards}>
          {/* Área para el mapeo de las cartas */}

          {currentCountries.length === 0 && !show?
            <div className={styles.sinCoincidencias}>
              <img src={loadingIMG} alt="" />
            </div>:
          currentCountries.length > 0 ?       <CountriesCards currentCountries={currentCountries} />
          :   <div className={styles.sinCoincidencias}>
               <img src={loadingIMG} alt=""  />
              <h4>"No hay coincidencias"</h4>
            </div>
         }
          {/* Mapeo del Paginado */}

          <Paged
            countriesPerPage={countriesPerPage}
            allCountries={allCountries}
            paged={paged}
            key={"page" + currentPage}
            currentPage={currentPage}
          />
        </div>

        <div className={styles.filterActivity}>
          {/* Filtrado por Actividad */}

          <ActivityFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
