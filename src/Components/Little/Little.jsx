import React, {useState, useEffect} from "react";
import "./little.scss";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setCurrCity} from "../../currCitySlice";

export default function Little({name}) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setCurrCity(name));
  };

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=72f00aa027f15c09f5fe323a4e454a6f&lang=ru`
        );
        setWeatherData(response.data);
      } catch (error) {
        // Обработка ошибок
      }
    };

    fetchWeather();
  }, [name]);

  return (
    <div className="little" onClick={handleOnClick}>
      <div className="little__content">
        <h2>{name}</h2>
        {weatherData && (
          <>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <h3>{Math.round(weatherData.main.temp - 273.15)}°C</h3>
            <p>
              {" "}
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
