import axios from "axios";

import {
  GETALLCOUNTRIES,
  FILTERBYCONTINENT,
  ORDERBYCOUNTRYNAME,
 // ORDERBYCOUNTRYPOPULATION,
  GETCOUNTRYBYNAME,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  FILTERBYACTIVITY,
  ALLFILTERS
} from "./constants";

export const getCountries = () => {
  return async (dispatch) => {
    let allCountries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GETALLCOUNTRIES,
      payload: allCountries.data,
    });
  };
};

export const filterCountriesByContinent = (payload) => {
  return {
    type: FILTERBYCONTINENT,
    payload: payload,
  };
};

export const orderByCountryName = (payload) => {
  return {
    type: ORDERBYCOUNTRYNAME,
    payload: payload,
  };
};
// export const orderByCountryPopulation = (payload) => {
//   return {
//     type: ORDERBYCOUNTRYPOPULATION,
//     payload: payload,
//   };
// };

export const getCountryByName = (payload) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/countries?name=${payload}`
    );
    return dispatch({
      type: GETCOUNTRYBYNAME,
      payload: response.data,
    });
  };
};

export const postActivity = (payload) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/activity",
      payload
    );
    console.log('response post',response.data)
     return response.data;
  };
};

export const getCountryDetail = (payload) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/countries/${payload}`
    );
    return dispatch({
      type: GETCOUNTRYDETAIL,
      payload: response.data,
    });
  };
};

export const getActivitiesList = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/activity");
    return dispatch({
      type: GETACTIVITIES,
      payload: response.data,
    });
  };
};

export const filterCountriesByActivity = (payload) => {
   return {
    type: FILTERBYACTIVITY,
    payload: payload,
  };
};

export const allFilters = (payload) => {
   return {
    type: ALLFILTERS,
    payload: payload,
  };
};
