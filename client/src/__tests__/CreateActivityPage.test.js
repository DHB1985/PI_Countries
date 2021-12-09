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

describe("Create Activity", () => {
  let state = {
    countries: [],
    allCountries: [],
    countryDetail: [],
    activitiesNamesId: [],
  };
  const mockStore = configureStore([thunk]);

  const { GET_ALL_COUNTRIES, GET_ACTIVITIES } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateActivity)).toBeFalsy());

  xdescribe("Create Activity Components", () => {
    let createActivity;
    let store = mockStore(state);

    beforeEach(() => {
      createActivity = mount(
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

  describe("Manejo de estados", () => {
    let useState, useStateSpy, createActivity;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createActivity = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CreateActivity />
          </MemoryRouter>
        </Provider>
      );
    });
    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        countries: [],
        countriesNames: [],
        countriesFlags: [],
      });
    });

    xdescribe("Name input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
        createActivity.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Sky" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Sky",
          difficulty: "",
          duration: "",
          season: [],
          countries: [],
          countriesNames: [],
          countriesFlags: [],
        });
      });
    });

    xdescribe("Difficulty input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "difficulty', () => {
          createActivity.find('input[name="name"]').simulate("change", {
            target: { name: "difficulty", value: "Principiante" },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "Principiante",
            duration: "",
            season: [],
            countries: [],
            countriesNames: [],
            countriesFlags: [],
          });
        });
      });

      xdescribe("Duration input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "duration', () => {
          createActivity.find('input[name="duration"]').simulate("change", {
            target: { name: "duration", value:1.5 },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "",
            duration: 1.5,
            season: [],
            countries: [],
            countriesNames: [],
            countriesFlags: [],
          });
        });
      });

      xdescribe("Season input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "season', () => {
          createActivity.find('input[name="name"]').simulate("change", {
            target: { name: "season", value:['Primavera', 'Verano'] },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "",
            duration: '',
            season: ['Primavera', 'Verano'],
            countries: [],
            countriesNames: [],
            countriesFlags: [],
          });
        });
      });

      xdescribe("Countries input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "countries', () => {
          createActivity.find('input[name="name"]').simulate("change", {
            target: { name: "countries", value:['ARG', 'ITA'] },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "",
            duration: '',
            season: [],
            countries: ['ARG', 'ITA'],
            countriesNames: [],
            countriesFlags: [],
          });
        });
      });


      xdescribe("CountriesNames input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "countriesNames', () => {
          createActivity.find('input[name="name"]').simulate("change", {
            target: { name: "countriesNames", value:['Argentina', 'Italia'] },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "",
            duration: '',
            season: [],
            countries: [],
            countriesNames: ['Argentina', 'Italia'],
            countriesFlags: [],
          });
        });
      });

      xdescribe("countriesFlags input", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "countriesFlags', () => {
          createActivity.find('input[name="name"]').simulate("change", {
            target: { name: "countriesFlags", value:['Argentina', 'Italia'] },
          });
          expect(useState).toHaveBeenCalledWith({
            name: "",
            difficulty: "",
            duration: '',
            season: [],
            countries: [],
            countriesNames: [],
            countriesFlags: ['Argentina', 'Italia'],
          });
        });
      });



  });
});
