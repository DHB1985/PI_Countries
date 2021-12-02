import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { postActivity, getActivitiesList } from "../../redux/actions";
import SearchCountryActivity from "./SearchCountryActivity/SearchCountryActivity";

//Importacion de estilos
import styles from "./CreateActivity.module.css";

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

  const history = useNavigate();

  let [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    countries: [],
    countriesNames: [],
    countriesFlags: [],
  });

  let [habilButton, setHabilButton] = useState(true);

  const [errors, setErrors] = useState({
    name: "Se requiere un nombre",
    difficulty: "Se requiere una dificultad",
    duration: "Se requiere una duracion",
    season: "Se requiere una temporada",
    countries: "Se requiere al menos un país",
  });

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
    dispatch(getActivitiesList());
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: [],
      countries: [],
      countriesNames: [],
    });
    history("/home");
  };

  // //Uso este useEffect para que me dashabilite el boton de Crear Actividad porque si no lo pongo
  // //e ingreso una letra en el nombre me lo habilita y si sigo escribiendo o pongo otra opción me lo
  // //deshabilita

  useEffect(() => {
    setErrors(validate(input));
    setHabilButton(errors);
  }, [input]);

  //Uso este useEffect para que cada vez que cambie el estado error me habilite o deshabilite el boton
  //de crear actividad

  useEffect(() => {
    setHabilButton(buttonValidate(errors));
  }, [errors]);

  //Funciones para hacer la barra de busqueda de paises
  const handleSelectCountries = (event) => {
 
    setInput({
      ...input,
      countries: !input.countries.includes(event.target.id)
        ? [...input.countries, event.target.id]
        : input.countries,
      countriesNames: !input.countriesNames.includes(event.target.value)
        ? [...input.countriesNames, event.target.value]
        : input.countriesNames,
      countriesFlags: !input.countriesFlags.includes(event.target.name)
        ? [...input.countriesFlags, event.target.name]
        : input.countriesFlags,
    });
    setErrors(validate({ ...input, [event.target.name]: event.target.id }));
  };

  const hanldeDeleteCountrie = (event) => {
    setInput({
      ...input,
      countries: input.countries.filter(
        (countr) => countr !== event.target.value
      ),
      countriesNames: input.countriesNames.filter(
        (countr) => countr !== event.target.id
      ),
      countriesFlags: input.countriesFlags.filter(
        (countr) => countr !== event.target.name
      ),
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
    <div className={styles.contentBox}>
      <div className={styles.activityTitleBox}>
        <Link to="/home"><button>Volver</button></Link>
        <h1>Crear Actividad</h1>
      </div>
      <div className={styles.activityData}>
        <div className={styles.activityInputs}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            id="createActivity"
            className={styles.activityForm}
          >
            <div className={styles.activityFormNameDur}>
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
              </div>
            </div>
            <div className={styles.activityDifficulty}>
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
            </div>

            <div className={styles.activitySeason}>
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
            </div>
          </form>
          <SearchCountryActivity
            handleSelectCountries={handleSelectCountries}
          />
        </div>
        <div className={styles.activityFooter}>
          <div className={styles.errorsListBtn}>
            <div className={styles.errorsList}>
              <label>Errores</label>
              <label>Nombre: {errors.name ? errors.name : "Sin errores"}</label>
              <label>
                Tiempo: {errors.duration ? errors.duration : "Sin errores"}
              </label>
              <label>
                Dificultad:
                {errors.difficulty ? errors.difficulty : "Sin errores"}
              </label>
              <label>
                Temporadas:{errors.season ? errors.season : "Sin errores"}
              </label>
              <label>
                Países:{errors.countries ? errors.countries : "Sin errores"}
              </label>
            </div>
            <button
              type="submit"
              disabled={habilButton}
              key="submitFormButton"
              form="createActivity"
            >
              Crear Actividad
            </button>
          </div>
          <div className={styles.countriesToAdd}>
            <label>Paises:</label>
            <div className={styles.activityCountryList}>
              {input.countriesNames.map((element, index) => (
                <div className={styles.countriesActivityList}>
                  <span>
                    <img
                      src={input.countriesFlags[index]}
                      alt="Img not found"
                      width="15px"
                      height="15px"
                    />
                    {element}
                    <button
                      onClick={(event) => hanldeDeleteCountrie(event)}
                      key={element}
                      value={input.countries[index]}
                      id={element}
                      name={input.countriesFlags[index]}
                    >
                      x
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateActivity;
