import React, {useState, useEffect} from "react";

import "../assets/style/_app.scss";
import Main from "../Components/Main/Main";
import Little from "./Little/Little";

function App() {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  console.log(currentCity);

  const changeCity = (cityName) => {
    setCurrentCity(cityName);
  };

  return (
    <div className="app">
      <div className="wrapper row">
        <Main
          currentCity={currentCity}
          favoriteCities={favoriteCities}
          setFavoriteCities={setFavoriteCities}
        />
        <div className="table">
          {favoriteCities.map((city, i) => (
            <Little key={i} name={city} onClick={() => changeCity(city)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
