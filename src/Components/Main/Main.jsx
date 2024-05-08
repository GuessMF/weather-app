import React, {useState, useEffect} from "react";
import "./main.scss";
import axios from "axios";
import add_icon from "../../assets/icons/add_icon.png";
import added_icon from "../../assets/icons/added_icon.png";
import search_icon from "../../assets/icons/search_icon.png";
export default function Main({currentCity, favoriteCities, setFavoriteCities}) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  //   const [favoriteCities, setFavoriteCities] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72f00aa027f15c09f5fe323a4e454a6f&lang=ru`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const findCity = (city) => {
    if (city !== "") {
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
    if (currentCity) {
      setCity("");
      fetchWeather(currentCity);
    }
  }, [currentCity]);

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
    setIsFavorite(favoriteCities.includes(city));
  }, [city, favoriteCities]);

  const addFavoriteCity = () => {
    if (!favoriteCities.includes(city)) {
      const updatedCities = [...favoriteCities, city];
      setFavoriteCities(updatedCities);
      localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
      setIsFavorite(true);
    }
  };

  const removeFavoriteCity = () => {
    const updatedCities = favoriteCities.filter((c) => c !== city);
    setFavoriteCities(updatedCities);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
    setIsFavorite(false);
  };

  return (
    <div className="main">
      {city && (
        <button
          className="main__add_btn"
          onClick={isFavorite ? removeFavoriteCity : addFavoriteCity}
        >
          <img src={add_icon} />
        </button>
      )}

      <div className="main__input">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Введите город"
        />
        <button onClick={() => findCity(city)}>
          <img src={search_icon} />
        </button>
      </div>

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
              <h3 className="main__temperature">
                {Math.round(weatherData.main.temp - 273.15)}°C
              </h3>
              <h3 className="main__feels_like">
                Ошущается как {Math.round(weatherData.main.feels_like - 273.15)}
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

        {city && <hr />}

        <ul className="main__date">
          {" "}
          <p>{weekDay(currentDate)}</p>
          <p>{formatDate(currentDate)}</p>
          <p>{formatTime(currentDate)}</p>
        </ul>
      </div>
    </div>
  );
}
