import React, {useState, useEffect} from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72f00aa027f15c09f5fe323a4e454a6f`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city !== "") {
      fetchWeather();
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Введите город"
        />
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Температура: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Описание: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
