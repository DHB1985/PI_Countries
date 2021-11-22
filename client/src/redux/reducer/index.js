import {
  GETALLCOUNTRIES,
  FILTERBYCONTINENT,
  ORDERBYCOUNTRYNAME,
  ORDERBYCOUNTRYPOPULATION
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
    case ORDERBYCOUNTRYPOPULATION:
      let sortedCountriespop;
      if (action.payload === "ascendPob") {
        sortedCountriespop = state.countries.sort((a, b) => {
          if (a.population > b.population) {
            return 1;
          } else if (b.population > a.population) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "descendPob") {
        sortedCountriespop = state.countries.sort((a, b) => {
          if (a.population > b.population) {
            return -1;
          } else if (b.population > a.population) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        countries: sortedCountriespop,
      }

    default:
      return state;
  }
};

export default rootReducer;
