import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Countries App</h1>
      <Link exact path="/countries">
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default LandingPage;
