import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LandingPage from "../components/LandingPage/LandingPage";

configure({ adapter: new Adapter() });

describe("Create Activity", () => {
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
