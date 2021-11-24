import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path ="/activity" component={CreateActivity}/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
