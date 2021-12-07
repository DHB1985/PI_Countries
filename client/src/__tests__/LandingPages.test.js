// import React from "react";
// import { configure, mount, shallow } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import configureMockStore from "redux-mock-store";
// import LandingPage from "../components/LandingPage/LandingPage";
// import CreateActivity from "../components/CreateActivity/CreateActivity";
// import { Provider } from "react-redux";
// import store from "../redux/store/index";
// import { Route, Routes } from "react-router";
// configure({ adapter: new Adapter() });

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

// describe("Create Activity", () => {
//   describe("Estructura", () => {
//     let wrapper;
//     beforeEach(() => {
//       // wrapper = mount(<CreateActivity />);
//       //wrapper = <Provider store={store}><CreateActivity/></Provider>
//       wrapper = mount(
//         <Provider store={store}>
//           <Routes>
//             <React.Fragment>
//               <CreateActivity />
//             </React.Fragment>
//           </Routes>
//         </Provider>
//       );
//     });
//     //   it("should render without throwing an error", () => {
//     //     expect(
//     //         shallow(
//     //             <Provider store={store}>
//     //                 <CreateActivity />
//     //             </Provider>
//     //         ).exists(<h1>Crear Actividad</h1>)
//     //     ).toBe(true);
//     // });
//     it("Renderiza un <form>", () => {
//       console.log("data ", wrapper);
//       expect(wrapper.find("form")).toHaveLength(1);
//     });

//     it('Renderiza <button> con el texto "Ingresar"', () => {
//       expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
//     });

//     it('Renderiza <h1> con el texto "Bienvenidos', () => {
//       expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
//     });
//   });
// });

// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import { createSerializer } from 'enzyme-to-json';
// import '@testing-library/jest-dom';
// import { shallow } from 'enzyme';
// import CreateActivity from "../components/CreateActivity/CreateActivity";
// import { useSelector, useDispatch } from 'react-redux';
// //import LandingPage from "../components/LandingPage/LandingPage";
// Enzyme.configure({ adapter: new Adapter() });
// expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// describe("Create Activity", () => {
//   describe("Estructura", () => {
//     let wrapper;
//     beforeEach(() => {

//       wrapper = shallow( <CreateActivity />  );
//       //wrapper = shallow( <LandingPage />  );
//     });

//     it("Renderiza un <form>", () => {
//       console.log("data ", wrapper);
//       expect(wrapper.find("form")).toHaveLength(1);
//     });

//     // it('Renderiza <button> con el texto "Ingresar"', () => {
//     //   expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
//     // });

//     // it('Renderiza <h1> con el texto "Bienvenidos', () => {
//     //   expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
//     // });
//   });
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import * as ourActions from '../redux/actions/index';

import CreateActivity from "../components/CreateActivity/CreateActivity";
//import LandingPage from "../components/LandingPage/LandingPage";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;

// Enzyme.configure({ adapter: new Adapter() });
// const mockStore = configureMockStore([thunk]);

describe("Create Activity", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      // const store = mockStore({
      //   startup: { complete: false },
      // });
      // wrapper = mount(
      //   <Provider store={store}>
      //     <Route>
      //     <CreateActivity />
      //     </Route>
      //   </Provider>
      // );
      // //wrapper = shallow( <LandingPage />  );
      useDispatchMock.mockImplementation(() => () => {});
      useSelectorMock.mockImplementation(selector => selector(mockStore));

    });

    afterEach(() => {
      useDispatchMock.mockClear();
      useSelectorMock.mockClear();
  })

    it("Renderiza un <form>", () => {
      console.log("data ", wrapper);
      wrapper = render(<CreateActivity />)
      expect(wrapper.find("form")).toHaveLength(1);
    });

    // it('Renderiza <button> con el texto "Ingresar"', () => {
    //   expect(wrapper.find("button").at(0).text()).toEqual("Ingresar");
    // });

    // it('Renderiza <h1> con el texto "Bienvenidos', () => {
    //   expect(wrapper.find("h1").at(0).text()).toEqual("Bienvenidos");
    // });
  });
});
