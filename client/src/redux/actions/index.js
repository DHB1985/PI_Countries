import axios from "axios";

import {
  GETALLCOUNTRIES,
  GETCOUNTRYBYNAME,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
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

export const getCountryByName = (payload) => {
  console.log('payload', payload)
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/countries?name=${payload}`
    );
    console.log('responmse ', response)
    return dispatch({
      type: GETCOUNTRYBYNAME,
      payload: {response: response.data, condition: payload},
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

export const allFilters = (payload) => {
   return {
    type: ALLFILTERS,
    payload: payload,
  };
};