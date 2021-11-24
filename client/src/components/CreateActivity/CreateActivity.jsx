import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCountries, postActivity } from "../../redux/actions";

const validate = (input) =>{
  let errors = {}
  if (!input.name){
    errors.name = "Se requiere un nombre"
  } else if(!input.duration){
    errors.duration = "Se requiere una duracion"
  }

  return errors
}



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

  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrors(validate({...input, [event.target.name]: event.target.value}))
  };

  const handleCheckDificulty = (event) => {
    if (event.target.checked) {
      setInput({
        ...input,
        difficulty: event.target.value,
      });
    } 

  };

  const handleCheckSeason = (event) => {
    if (event.target.checked) {
      setInput({
        ...input,
        season: [...input.season, event.target.value],
      });
    }else if(!event.target.checked){
      setInput({
        ...input, 
        season: input.season.filter(diff => diff !== event.target.value)
      })
    }
   };

  const handleSelectCountries = (event) => {
    setInput({
      ...input,
      countries: [...input.countries, event.target.value],
    });
  }

  const hanldeDeleteCountrie = (element) =>{
    setInput({
      ...input, 
      countries: input.countries.filter(countr => countr !== element)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivity(input));
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
            required="required"
          />
          {errors.name && (<p> {errors.name} </p>)}
        </div>
        <div>
          <label>Duración: </label>
          <input
            type="number"
            name="duration"
            autoComplete="off"
            value={input.duration}
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese el nombre..."
            required="required"
          />
          {errors.duration && (<p> {errors.duration} </p>)}
        </div>
        <div>
          <label>Dificultad: </label>
          <label>
            <input
              type="radio"
              id="Principiante"
              name="dificulty"
              value="Principiante"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Principiante
          </label>
          <label>
            <input
              type="radio"
              id="Aficionado"
              name="dificulty"
              value="Aficionado"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Aficionado
          </label>
          <label>
            <input
              type="radio"
              id="Normal"
              name="dificulty"
              value="Normal"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Normal
          </label>
          <label>
            <input
              type="radio"
              id="Profesional"
              name="dificulty"
              value="Profesional"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Profesional
          </label>
          <label>
            <input
              type="radio"
              id="Experto"
              name="dificulty"
              value="Experto"
              onChange={(e) => handleCheckDificulty(e)}
            />
            Experto
          </label>
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
        </div>
        <label>Paises:</label>
        <select onChange={(e) => handleSelectCountries(e)}>
          {countries.map((value) => (
            <option value={value.id}>
              <img src={value.imgflag} width="10" height="10" />
                        {value.name}
            </option>
          ))}
        </select>
        <button type="submit">Crear Actividad</button>
        <ul>
          <li>{input.countries.map((element) => 
          <div>
          <p>{element}</p>
          <button onClick={()=> hanldeDeleteCountrie(element)}>x</button>
          </div>)}
          </li>
        </ul>
      </form>
    </div>
  );
};
export default CreateActivity;
