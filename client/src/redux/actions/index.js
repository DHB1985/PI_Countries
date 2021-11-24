import axios from "axios";

import {
  GETALLCOUNTRIES,
  FILTERBYCONTINENT,
  ORDERBYCOUNTRYNAME,
  ORDERBYCOUNTRYPOPULATION,
  GETCOUNTRYBYNAME,
  POSTACTIVITY
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
export const orderByCountryPopulation = (payload) => {
  return {
    type: ORDERBYCOUNTRYPOPULATION,
    payload: payload,
  };
};

export const getCountryByName = (payload) => {
    return async (dispatch) => {
        let response = await axios.get(`http://localhost:3001/countries?name=${payload}`);
        console.log('response', response)
        return dispatch({
            type: GETCOUNTRYBYNAME,
            payload: response.data,
        });
      }; 
};

export const postActivity = (payload) =>{
  console.log('actions index l 54', payload)
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/activity", payload)
    console.log('response post activity ', response)
    return response;
  }
}