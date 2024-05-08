import React, {useState, useEffect} from "react";
import "./main.scss";
import axios from "axios";
import delete_icon from "../../assets/icons/delete_icon.png";
import added_icon from "../../assets/icons/added_icon.png";
import search_icon from "../../assets/icons/search_icon.png";
import change_icon from "../../assets/icons/change_icon.png";

import {useDispatch, useSelector} from "react-redux";
import {setCurrCity, selectCurrCity} from "../../currCitySlice";

export default function Main({favoriteCities, setFavoriteCities}) {
  const dispatch = useDispatch();
  const currCity = useSelector(selectCurrCity);

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFavorite, setIsFavorite] = useState(false);

  const [currentUnits, setCurrentUnits] = useState("C");
  const [units, setUnits] = useState("F");

  const [celsuim, setCelsuim] = useState("");

  const [farengeite, setFarengeite] = useState("");

  const months = {
    0: "Января",
    1: "Февраля",
    2: "Марта",
    3: "Апреля",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Августа",
    8: "Сентября",
    9: "Октября",
    10: "Ноября",
    11: "Декабря",
  };
  const days = {
    0: "Понедельник",
    1: "Вторник",
    2: "Среда",
    3: "Четверг",
    4: "Пятница",
    5: "Суббота",
    6: "Воскресенье",
  };

  const fetchWeather = async (currCity) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=72f00aa027f15c09f5fe323a4e454a6f&lang=ru`
      );
      setWeatherData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Город не найден");
      } else {
        console.error("Ошибка при получении данных:", error.message);
      }
    }
  };

  useEffect(() => {
    if (weatherData) {
      const celsuimValue = Math.round(weatherData.main.temp - 273.15);
      const farengeitValue = celsuimValue * 1.8 + 32;
      setCelsuim(celsuimValue);
      setFarengeite(farengeitValue);
    }
  }, [weatherData]);

  const findCity = () => {
    if (city !== "") {
      dispatch(setCurrCity(city));
      fetchWeather(city);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currCity) {
      fetchWeather(currCity);
    }
  }, [currCity]);

  const formatDate = (date) => {
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
  };

  const weekDay = (date) => {
    return `${days[date.getDay() - 1]}`;
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  useEffect(() => {
    const storedCities =
      JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedCities);
  }, []);

  useEffect(() => {
    setIsFavorite(favoriteCities.includes(currCity));
  }, [currCity, favoriteCities]);

  const addFavoriteCity = () => {
    if (!favoriteCities.includes(currCity)) {
      const updatedCities = [...favoriteCities, currCity];
      setFavoriteCities(updatedCities);
      localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
      setIsFavorite(true);
    }
  };

  const removeFavoriteCity = () => {
    if (currCity) {
      const updatedCities = favoriteCities.filter((c) => c !== currCity);
      setFavoriteCities(updatedCities);
      localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
      setIsFavorite(false);
    }
  };

  const handleChangeUnits = () => {
    if (currentUnits === "C") {
      setUnits("C");
      setCurrentUnits("F");
    } else {
      setUnits("F");
      setCurrentUnits("C");
    }
  };

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Лондон",
    "Минск",
  ];
  const handleCityClick = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };
  useEffect(() => {
    findCity();
  }, [city]);
  return (
    <div className="main">
      {currCity && (
        <button
          className="main__add_btn"
          onClick={isFavorite ? removeFavoriteCity : addFavoriteCity}
        >
          <img src={isFavorite ? delete_icon : added_icon} />
        </button>
      )}

      <div className="main__input">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Введите город"
        />
        <button onClick={findCity}>
          <img src={search_icon} />
        </button>
      </div>

      <select
        value={city}
        onChange={(event) => handleCityClick(event)}
        className="main__select"
      >
        <option value="">Выберите город</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      <div className="main__content">
        {weatherData && (
          <div>
            {weatherData.weather[0].icon && (
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                className="main__icon"
              />
            )}

            <ul className="main__list">
              <h2 className="main__city">{weatherData.name}</h2>
              <div className="main__temperature_box">
                <h3 className="main__temperature">
                  {units === "F" ? celsuim : farengeite}
                </h3>
                <span>°{currentUnits}</span>
                <button onClick={handleChangeUnits}>
                  <img src={change_icon} />
                </button>
                <span>°{units}</span>
              </div>

              <h3 className="main__feels_like">
                Ошущается как {units === "F" ? celsuim : farengeite}°
              </h3>
            </ul>

            <p className="main__description">
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>

            <div className="main__bottom">
              <p> Ветер {weatherData.wind.speed} м/с </p>
              <p>Влажность {weatherData.main.humidity} %</p>
              <p> Давление {weatherData.main.pressure} мм </p>
            </div>
          </div>
        )}

        {currCity && <hr />}

        <ul className="main__date">
          <p>{weekDay(currentDate)}</p>
          <p>{formatDate(currentDate)}</p>
          <p>{formatTime(currentDate)}</p>
        </ul>
      </div>
    </div>
  );
}
