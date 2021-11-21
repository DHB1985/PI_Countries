import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { Link } from "react-router-dom";
import CountryCard from "../Card/Card";

//Importacion del Paginado
import Paged from "../Paged/Paged";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleClick = (event) => {
    dispatch(getCountries());
    event.preventDefault();
  };

  // Estados locales para setear el paginado
  const [currentPage, setCurrentPage] = useState(1); //Setea la página actual en 1
  const [countriesPerPage, setcountriesPerPage] = useState(10); // Setea la cantidad de paises por pagina
  let indexFirstPage = 0; //Para restar 1 país en la primer página y que uestre solo 9
  //Este if es para mostrar 9 en la primer página, si no es la primera va a valer 0, entonces va a mostrar 10
  //Pierdo uno entre la pagina 1 y la 2
  if (currentPage === 1){
    indexFirstPage=1
   } else {
     indexFirstPage = 0
   }
  const indexOfLastCountry = currentPage * (countriesPerPage - indexFirstPage); //Para setear el el índice del último país en la pagina actual
  const indexOfFirstCountry = indexOfLastCountry - (countriesPerPage-indexFirstPage); // Para setear el índice del primer paíes ne la página

  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); //deja solo la cantidad de países que necesito en cada página
  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //Setea el número de la página a mostrar

  return (
    <div>
      <h2>Welcome to Countrie App</h2>
      <Link to="/activity">Crear actividad Turística</Link>
      <button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Volver a Cargar
      </button>

      {/* Orden Ascendente/Descendente por nombre*/}
      <div>
        <select>
          <option value="ascend">Ascendente</option>
          <option value="descend">Descendente</option>
        </select>
      </div>

      {/* Orden Ascendente/Descendente por cantidad de poblacion*/}
      <div>
        <select>
          <option value="ascendPob">Pob. Ascendente</option>
          <option value="descendPob">Pob. Descendente</option>
        </select>
      </div>

      {/* Filtrado por Continente */}
      <div>
        <select>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europa">Europa</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {/* Filtrado por Actividad */}
      <div>
        <select>
          <option value="all">Todas</option>
          <option value="actividad1">actividad1</option>
          <option value="actividad2">actividad2</option>
          <option value="actividad3">actividad3</option>
          <option value="actividad4">actividad4</option>
        </select>
      </div>

      {/* Mapeo del Paginado */}
      <div>
        <Paged
          countriesPerPage={countriesPerPage}
          allCountriesLength={allCountries.length}
          paged={paged}
        />
      </div>

      {/* Mapeo de las cards del pais */}
      <div>
        {currentCountries &&
          currentCountries.map((country) => {
            return (
              <CountryCard
                imgflag={country.imgflag}
                name={country.name}
                continent={country.continent}
                population={country.population}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
