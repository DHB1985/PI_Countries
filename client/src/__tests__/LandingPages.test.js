import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateActivity from "../components/CreateActivity/CreateActivity";
import { Provider } from "react-redux";
import store from "../redux/store/index";
import { Route, Routes } from "react-router";
configure({ adapter: new Adapter() });

describe("Landing Page", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LandingPage />);
      });
    it("Renderiza un <button>", () => {
      expect(wrapper.find("button")).toHaveLength(1);
    });

    it('Renderiza <button> con el texto "Ingresar"', () => {
      expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
    });

    it('Renderiza <h1> con el texto "Bienvenidos', () => {
      expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
    });
  });
});


/*
//Anda con el CreateActivity
import React from "react";
import { mount, configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";
import CreateActivity from "../components/CreateActivity/CreateActivity";
import * as actions from "../redux/actions/index";

configure({ adapter: new Adapter() });

describe("Landing Page", () => {
  let state = {
    countries: [],
    allCountries: [],
    countryDetail: [],
    activitiesNamesId: [],
  };
  const mockStore = configureStore([thunk]);

  const { GET_ALL_COUNTRIES, GET_ACTIVITIES } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateActivity)).toBeFalsy());

  describe("Landing prueba", () => {
    let landing;
    let store = mockStore(state);

    beforeEach(() => {
      landing = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CreateActivity />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Renderiza un <form>", () => {

      expect(landing.find("form")).toHaveLength(1);
    });
  });
});
*/