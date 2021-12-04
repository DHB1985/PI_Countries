import {
  GETALLCOUNTRIES,
  FILTERBYCONTINENT,
  ORDERBYCOUNTRYNAME,
  // ORDERBYCOUNTRYPOPULATION,
  GETCOUNTRYBYNAME,
  POSTACTIVITY,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  FILTERBYACTIVITY,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  activitiesNamesId: [],
  continentsFilter: [],
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
      let stateFiltered = [];
      if (action.payload.length !== 0) {
        for (let element of action.payload) {
          stateFiltered = [
            ...stateFiltered,
            ...state.allCountries.filter(
              (value) => value.continent === element
            ),
          ];
        }
      } else {
        stateFiltered = state.allCountries;
      }
      return {
        ...state,
        countries: stateFiltered,
      };

    case ORDERBYCOUNTRYNAME:
      let sortedCountries = sortedCountries(action.payload, state.allCountries);
      return {
        ...state,
        countries: sortedCountries,
      };

    case GETCOUNTRYBYNAME:
      return {
        ...state,
        countries: action.payload,
      };

    case POSTACTIVITY:
      return {
        ...state,
      };

    case GETCOUNTRYDETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case GETACTIVITIES:
      let activitys;
      if (action.payload[0].name !== "No hay actividades guardadas") {
        activitys = action.payload.map((elem) => {
          return { name: elem.name, id: elem.id };
        });
      }
      return {
        ...state,
        activitiesNamesId: activitys,
      };

    case FILTERBYACTIVITY:
      let stateFilteredAct = [];
      if (action.payload === "All") {
        stateFilteredAct = state.allCountries;
      } else {
        let id = parseInt(action.payload);
        for (let element of state.allCountries) {
          if (element.activities.length !== 0) {
            for (let elem of element.activities) {
              if (elem.id === id) {
                stateFilteredAct = [...stateFilteredAct, element];
              }
            }
          }
        }
      }

      return {
        ...state,
        countries: stateFilteredAct,
      };

    default:
      return state;
  }
};

export default rootReducer;
