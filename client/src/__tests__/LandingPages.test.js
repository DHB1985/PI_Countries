import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateActivity from "../components/CreateActivity/CreateActivity"
import { Provider } from "react-redux";
import store from "../redux/store/index"
configure({ adapter: new Adapter() });

// describe("Landing Page", () => {
//   describe("Estructura", () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = shallow(<LandingPage />);
//     });
//     it("Renderiza un <button>", () => {
//       expect(wrapper.find("button")).toHaveLength(1);
//     });

//     it('Renderiza <button> con el texto "Ingresar"', () => {
//       expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
//     });

//     it('Renderiza <h1> con el texto "Bienvenidos', () => {
//       expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
//     });
//   });
// });

describe("Create Activity", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {

     // wrapper = shallow(<CreateActivity />);
      wrapper = <Provider store={store}><CreateActivity/></Provider>

    });
  //   it("should render without throwing an error", () => {
  //     expect(
  //         shallow(
  //             <Provider store={store}>
  //                 <CreateActivity />
  //             </Provider>
  //         ).exists(<h1>Crear Actividad</h1>)
  //     ).toBe(true);
  // });
    it("Renderiza un <form>", (data) => {
console.log('data ', data)
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Renderiza <button> con el texto "Ingresar"', () => {
      expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
    });

    it('Renderiza <h1> con el texto "Bienvenidos', () => {
      expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
    });
  });
});