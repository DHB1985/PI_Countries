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