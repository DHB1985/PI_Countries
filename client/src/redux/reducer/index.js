import {
  sortedCountries,
  filterByActivity,
  filterByContinent,
} from "../../utils/Utils.jsx";
import {
  GETALLCOUNTRIES,
  GETCOUNTRYBYNAME,
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
  filterState: { continent: [], sort: "Orden", activity: "All" },
  filterNameCountry: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GETCOUNTRYBYNAME:
      let countries = action.payload.response;

      if (state.filterState.continent.length !== 0) {
        countries = filterByContinent(state.filterState.continent, countries);
      }

      countries = filterByActivity(state.filterState.activity, countries);

      countries = sortedCountries(state.filterState.sort, countries);

      return {
        ...state,
        countries: countries,
        filterNameCountry: action.payload.condition,
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

    case ALLFILTERS:
      let countriesAllFilters =
        state.filterNameCountry === "" ? state.allCountries : state.countries;

      if (action.payload.continent.length !== 0) {
        countriesAllFilters = filterByContinent(
          action.payload.continent,
          countriesAllFilters
        );
      }
      console.log("countries ", countriesAllFilters);
      countriesAllFilters = filterByActivity(
        action.payload.activity,
        countriesAllFilters
      );

      countriesAllFilters = sortedCountries(
        action.payload.sort,
        countriesAllFilters
      );

      return {
        ...state,
        countries: countriesAllFilters,
        filterState: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
