import axios from 'axios'; 

import { GETALLCOUNTRIES } from './constants';


export const getCountries = ()=>{
    return async (dispatch) =>{
        let allCountries = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: GETALLCOUNTRIES,
            payload: allCountries
        })
    }
}