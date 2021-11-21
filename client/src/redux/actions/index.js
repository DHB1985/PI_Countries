import axios from 'axios'; 

import { GETALLCOUNTRIES, FILTERBYCONTINENT, ORDERBYCOUNTRYNAME } from './constants';


export const getCountries = ()=>{
    return async (dispatch) =>{
        let allCountries = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: GETALLCOUNTRIES,
            payload: allCountries.data
        })
    }
}

export const filterCountriesByContinent = (payload)=>{
    return {
        type: FILTERBYCONTINENT,
        payload: payload
    }
}

export const orderByCountryName = (payload)=>{
    return {
        type: ORDERBYCOUNTRYNAME,
        payload: payload
    }
}

