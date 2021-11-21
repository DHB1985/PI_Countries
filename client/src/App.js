import {Link, Route, BrowserRouter, Switch} from "react-router-dom"


import './App.css';
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>

      </Switch>
      <h1>Henry Countries</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
