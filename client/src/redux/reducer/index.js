import {
  GETALLCOUNTRIES,
  FILTERBYCONTINENT,
  ORDERBYCOUNTRYNAME,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case FILTERBYCONTINENT:
      let stateFiltered;
      if (action.payload === "All") {
        stateFiltered = state.allCountries;
      } else {
        stateFiltered = state.allCountries.filter(
          (value) => value.continent === action.payload
        );
      }
      return {
        ...state,
        countries: stateFiltered,
      };

    case ORDERBYCOUNTRYNAME:
      let sortedCountries;
      if (action.payload === "ascendName") {
        sortedCountries = state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "descendName") {
        sortedCountries = state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        countries: sortedCountries,
      }

    default:
      return state;
  }
};

export default rootReducer;
