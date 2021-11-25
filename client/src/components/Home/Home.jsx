import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { Link } from "react-router-dom";
import CountriesCards from "../Cards/Cards";
import CountrySort from "../Sort/Sort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import SearchBar from "../SearchBar/SearchBar";

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
  }; //Funcion para resetear el State, para que vuelva a traer todos los países

  //Estado para el ordenamiento
  //Esta puesto para que cambie el estado local y renderize
  //la pagina cada vez que ordeno por población o por nombre
  //Si no lo pongo cuando esta enn la pagina 1 no lo renderiza de nuevo
  const [orden, setOrden] = useState("");

  // Estados locales para setear el paginado
  const [currentPage, setCurrentPage] = useState(1); //Setea la página actual en 1
  const [countriesPerPage, setcountriesPerPage] = useState(10); // Setea la cantidad de paises por pagina
  let indexFirstPage = 0; //Para restar 1 país en la primer página y que uestre solo 9
  //Este if es para mostrar 9 en la primer página, si no es la primera va a valer 0, entonces va a mostrar 10
  //Pierdo uno entre la pagina 1 y la 2
  if (currentPage === 1) {
    indexFirstPage = 1;
  } else {
    indexFirstPage = 0;
  }
  const indexOfLastCountry = currentPage * (countriesPerPage - indexFirstPage); //Para setear el el índice del último país en la pagina actual
  const indexOfFirstCountry =
    indexOfLastCountry - (countriesPerPage - indexFirstPage); // Para setear el índice del primer paíes ne la página

  const currentCountries = !Array.isArray(allCountries)?allCountries: allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); //deja solo la cantidad de países que necesito en cada página
  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //Setea el número de la página a mostrar
  //Final de las funciones de paginado

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

      {/* SearchBar */}
      <SearchBar />

      {/* Orden alfabetico o por poblacion ascendente o descendente */}
      <CountrySort setCurrentPage={setCurrentPage} setOrden={setOrden} />

      {/* Filtrado por Continente */}
      <ContinentFilter setCurrentPage={setCurrentPage}/>

      {/* Filtrado por Actividad */}
      <div>
        <select>
          <option value="All">Todas</option>
          <option value="actividad1">actividad1</option>
          <option value="actividad2">actividad2</option>
          <option value="actividad3">actividad3</option>
          <option value="actividad4">actividad4</option>
        </select>
      </div>

      {/* Mapeo del Paginado */}

      <Paged
        countriesPerPage={countriesPerPage}
        allCountries={allCountries}
        paged={paged}
      />

      {/* Área para el mapeo de las cartas */}
      <div>
        <CountriesCards currentCountries={currentCountries} />
      </div>
    </div>
  );
};

export default Home;
