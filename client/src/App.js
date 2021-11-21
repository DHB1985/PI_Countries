import {Link, Route} from "react-router-dom"


import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Link exact path="/countries"><p>Enter</p></Link>
    </div>
  );
}

export default App;
