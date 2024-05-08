import React, {useState, useEffect} from "react";

import "../assets/style/_app.scss";
import Main from "../Components/Main/Main";
import Little from "./Little/Little";

function App() {
  const [favoriteCities, setFavoriteCities] = useState([]);
  return (
    <div className="app">
      <div className="wrapper row">
        <Main
          favoriteCities={favoriteCities}
          setFavoriteCities={setFavoriteCities}
        />
        <div className="table">
          {favoriteCities.map((city, i) => (
            <Little key={i} name={city} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
