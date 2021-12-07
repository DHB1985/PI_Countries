import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { postActivity, getActivitiesList } from "../../redux/actions";

import SearchCountryActivity from "./SearchCountryActivity/SearchCountryActivity";
import SelectDifficulty from "./SelectDifficulty/SelectDifficulty";
import SelectSeason from "./SelectSeason/SelectSeason";
import ErrorsList from "./ActivityErrors/ActivityErrors";

//Importacion de estilos
import styles from "./CreateActivity.module.css";

const validate = (input) => {
  let errors = [];
  if (!input.name) {
    errors = [...errors, "Se requiere un nombre"];
  }
  if (!input.difficulty) {
    errors = [...errors, "Se requiere una dificultad"];
  }
  if (!input.duration) {
    errors = [...errors, "Se requiere una duracion"];
  }
  if (input.season.length === 0) {
    errors = [...errors, "Se requiere una temporada"];
  }
  if (input.countries.length === 0) {
    errors = [...errors, "Se requiere al menos un país"];
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

  const [errors, setErrors] = useState([
    "Se requiere un NOMBRE",
    "Se requiere una DIFICULTAD",
    "Se requiere una DURACION",
    "Se requiere una TEMPORADA",
    "Se requiere al menos un PAÍS",
  ]);

  // //Uso este useEffect para que me dashabilite el boton de Crear Actividad porque si no lo pongo
  // //e ingreso una letra en el nombre me lo habilita y si sigo escribiendo o pongo otra opción me lo
  // //deshabilita

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  //Uso este useEffect para que cada vez que cambie el estado error me habilite o deshabilite el boton
  //de crear actividad

  useEffect(() => {
    setHabilButton(buttonValidate(errors));
  }, [errors]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await dispatch(postActivity(input));
    dispatch(getActivitiesList());
    alert("La actividad " + response.name + " fue creada");
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
  //Funcion para los cambios integrados

  const handleChangeIntegrated = (event) => {
    const target = event.target;
    let value;
    if (target.type === "radio") {
      if (target.checked) value = target.value;
    } else {
      value = target.value;
    }
    const name = target.name;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  return (
    <div className={styles.contentBox}>
      <div className={styles.activityTitleBox}>
        <Link to="/home">
          <button>Volver</button>
        </Link>
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
                  onChange={(e) => handleChangeIntegrated(e)}
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
                  onChange={(e) => handleChangeIntegrated(e)}
                  placeholder="Ingrese la duración..."
                />
              </div>
            </div>

            <SelectDifficulty handleChangeIntegrated={handleChangeIntegrated} />

            <SelectSeason handleCheckSeason={handleCheckSeason} />
          </form>
          <SearchCountryActivity
            handleSelectCountries={handleSelectCountries}
          />
        </div>
        <div className={styles.activityFooter}>
          <div className={styles.errorsListBtn}>
            <ErrorsList errors={errors} />

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
                <div
                  key={"mapeocountries" + element}
                  className={styles.countriesActivityList}
                >
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
