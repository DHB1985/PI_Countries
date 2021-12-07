import {
  sortedCountries,
  filterByActivity,
  filterByContinent,
} from "../../utils/Utils.jsx";
import {
  GETALLCOUNTRIES,
  POSTACTIVITY,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  ALLFILTERS,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  activitiesNamesId: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case ALLFILTERS:
      let countries =
        action.payload.condition.countrySearch === ""
          ? state.allCountries
          : action.payload.response;

      if (action.payload.condition.continent.length !== 0) {
        countries = filterByContinent(
          action.payload.condition.continent,
          countries
        );
      }
      if (action.payload.condition.activity !== "All") {
        countries = filterByActivity(
          action.payload.condition.activity,
          countries
        );
      }

      if (action.payload.condition.sort !== "Orden") {
        countries = sortedCountries(action.payload.condition.sort, countries);
      }

      return {
        ...state,
        countries: countries,
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

    default:
      return state;
  }
};

export default rootReducer;
