import { GETALLCOUNTRIES } from "../actions/constants";

const initialState = {
  countries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
