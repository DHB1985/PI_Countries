import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postActivity, getActivitiesList } from "../../redux/actions";
import SearchCountryActivity from "./SearchCountryActivity/SearchCountryActivity";


const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!input.difficulty) {
    errors.difficulty = "Se requiere una dificultad";
  }
  if (!input.duration) {
    errors.duration = "Se requiere una duracion";
  }
  if (input.season.length === 0) {
    errors.season = "Se requiere una temporada";
  }
  if (input.countries.length === 0) {
    errors.countries = "Se requiere al menos un país";
  }

  return errors;
};

const buttonValidate = (errors) => {
  if (Object.keys(errors).length === 0) {
    return false;
  } else {
    return true;
  }
};

const CreateActivity = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.allCountries);

  const history = useHistory();

  let [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    countries: [],
  });

  let [habilButton, setHabilButton] = useState(true);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrors(validate({ ...input, [event.target.name]: event.target.value }));
  };

  const handleCheckDificulty = (event) => {
    if (event.target.checked) {
      setInput({
        ...input,
        difficulty: event.target.value,
      });
    }
    setErrors(validate({ ...input, [event.target.name]: event.target.value }));
  };

  const handleCheckSeason = (event) => {
    if (event.target.checked) {
      setInput({
        ...input,
        season: [...input.season, event.target.value],
      });
      setErrors(
        validate({ ...input, [event.target.name]: event.target.value })
      );
    } else if (!event.target.checked) {
      setInput({
        ...input,
        season: input.season.filter((diff) => diff !== event.target.value),
      });
      setErrors(
        validate({
          ...input,
          season: input.season.filter((diff) => diff !== event.target.value),
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivity(input));
    dispatch(getActivitiesList())
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: [],
      countries: [],
    });
    history.push("/home");
  };

  //Uso este useEffect para que me dashabilite el boton de Crear Actividad porque si no lo pongo
  //e ingreso una letra en el nombre me lo habilita y si sigo escribiendo o pongo otra opción me lo
  //deshabilita

  useEffect(() => {
    setErrors(validate(input));
    setHabilButton(errors);
  }, []);

  //Uso este useEffect para que cada vez que cambie el estado error me habilite o deshabilite el boton
  //de crear actividad

  useEffect(() => {
    setHabilButton(buttonValidate(errors));
  }, [errors]);

  //Funciones para hacer la barra de busqueda de paises
  const handleSelectCountries = (event) => {
 
    setInput({
      ...input,
      countries: !input.countries.includes(event.target.value) ?[...input.countries,event.target.value]:input.countries
    });
    setErrors(validate({ ...input, [event.target.name]: event.target.value }));
  };

  const hanldeDeleteCountrie = (event) => {
    setInput({
      ...input,
      countries: input.countries.filter((countr) => countr !== event),
    });
    setErrors(
      validate({
        ...input,
        countries: input.countries.filter((countr) => countr !== event),
      })
    );
  };

  //Fin de funciones para la barra de busqueda

  return (
    <div>
      <Link to="/home">Volver</Link>
      <h1>Crear Actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={input.name}
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese el nombre..."
          />
          {errors.name && <p> {errors.name} </p>}
        </div>
        <div>
          <label>Duración: </label>
          <input
            type="number"
            name="duration"
            autoComplete="off"
            min="0.5"
            step="0.5"
            value={input.duration}
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese el nombre..."
          />
          {errors.duration && <p> {errors.duration} </p>}
        </div>
        <div>
          <label>Dificultad: </label>
          <label>
            <input
              type="radio"
              id="Principiante"
              name="difficulty"
              value="Principiante"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Principiante
          </label>
          <label>
            <input
              type="radio"
              id="Aficionado"
              name="difficulty"
              value="Aficionado"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Aficionado
          </label>
          <label>
            <input
              type="radio"
              id="Normal"
              name="difficulty"
              value="Normal"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Normal
          </label>
          <label>
            <input
              type="radio"
              id="Profesional"
              name="difficulty"
              value="Profesional"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Profesional
          </label>
          <label>
            <input
              type="radio"
              id="Experto"
              name="difficulty"
              value="Experto"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Experto
          </label>
          {errors.difficulty && <p> {errors.difficulty} </p>}
        </div>
        <div>
          <label>Temporada: </label>
          <label>
            <input
              type="checkbox"
              name="season"
              value="Otoño"
              onChange={(e) => handleCheckSeason(e)}
            />
            Otoño
          </label>
          <label>
            <input
              type="checkbox"
              name="season"
              value="Invierno"
              onChange={(e) => handleCheckSeason(e)}
            />
            Invierno
          </label>
          <label>
            <input
              type="checkbox"
              name="season"
              value="Primavera"
              onChange={(e) => handleCheckSeason(e)}
            />
            Primavera
          </label>
          <label>
            <input
              type="checkbox"
              name="season"
              value="Verano"
              onChange={(e) => handleCheckSeason(e)}
            />
            Verano
          </label>
          {errors.season && <p> {errors.season} </p>}
        </div>
        <label>Paises:</label>
        
        <div>
        <button type="submit" disabled={habilButton} key="submitFormButton">
          Crear Actividad
        </button>
        </div>
      </form>
        <div>
        <ul>
          <li>
            {input.countries.map((element) => (
              <div>
                <p>{element}</p>
                <button onClick={() => hanldeDeleteCountrie(element)} key={element.id+element.name}>x</button>
              </div>
            ))}
          </li>
        </ul>
        </div>
      <SearchCountryActivity handleSelectCountries = {handleSelectCountries}/>
            {errors.countries && <p> {errors.countries} </p>}

    </div>
  );
};
export default CreateActivity;
