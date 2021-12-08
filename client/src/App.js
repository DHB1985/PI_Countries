import { Route, BrowserRouter, Routes } from "react-router-dom";
// import {Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import NoMatch from "./components/PageNotFound/PageNotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<CountryDetail />} />
          <Route path="/activity" element={<CreateActivity />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
