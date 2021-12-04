import {
  sortedCountries,
  filterByActivity,
  filterByContinent,
} from "../../utils/Utils.jsx";
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
  sort: "",
  activityFilter: "",
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
      stateFiltered = filterByContinent(
        action.payload,
        state.countries,
        state.allCountries
      );
      stateFiltered = sortedCountries(state.sort, stateFiltered);

      return {
        ...state,
        countries: stateFiltered,
      };

    case ORDERBYCOUNTRYNAME:
      let sorted = sortedCountries(action.payload, state.countries);
      return {
        ...state,
        countries: sorted,
        sort: action.payload,
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
      let stateFilteredAct = filterByActivity(
        action.payload,
        state.countries,
        state.allCountries
      );
      stateFilteredAct = sortedCountries(state.sort, stateFilteredAct);
      return {
        ...state,
        countries: stateFilteredAct,
        activityFilter: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
