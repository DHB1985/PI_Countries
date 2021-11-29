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
      if (action.payload.checked) {
        state.continentsFilter = [
          ...state.continentsFilter,
          action.payload.value,
        ];
      } else {
        state.continentsFilter = state.continentsFilter.filter(
          (value) => value !== action.payload.value
        );
      }
      if (state.continentsFilter.length !== 0) {
        for (let element of state.continentsFilter) {
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
      } else if (action.payload === "ascendPob") {
        sortedCountries = state.countries.sort((a, b) => {
          if (a.population > b.population) {
            return 1;
          } else if (b.population > a.population) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "descendPob") {
        sortedCountries = state.countries.sort((a, b) => {
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
        countries: sortedCountries,
      };
    // case ORDERBYCOUNTRYPOPULATION:
    //   let sortedCountriespop;
    //   if (action.payload === "ascendPob") {
    //     sortedCountriespop = state.countries.sort((a, b) => {
    //       if (a.population > b.population) {
    //         return 1;
    //       } else if (b.population > a.population) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //   } else if (action.payload === "descendPob") {
    //     sortedCountriespop = state.countries.sort((a, b) => {
    //       if (a.population > b.population) {
    //         return -1;
    //       } else if (b.population > a.population) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //   }
    //   return {
    //     ...state,
    //     countries: sortedCountriespop,
    //   };

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
      if (action.payload[0].name !== "No hay actividades guardadas")
      {activitys = action.payload.map((elem) => {
        return { name: elem.name, id: elem.id };
      });}
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
