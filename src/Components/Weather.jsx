import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Time from "./Time";

import logo from "../assets/favicon.png";
import Search from "../assets/search.png";
import cloudy from "../assets/cloudy .png";
import cloudyRainSun from "../assets/cloudy-rain-sun.png";
import cloudySun from "../assets/cloudy-sunny.png";
import humidity from "../assets/humidity.png";
import rainDay from "../assets/rainy-day.png";
import sun from "../assets/sun.png";
import wind from "../assets/wind.png";
import strom from "../assets/strom.png";
import snow from "../assets/snow.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloudySun,
    "03d": cloudy,
    "04d": cloudy,
    "09d": rainDay,
    "10d": cloudyRainSun,
    "11d": strom,
    "13d": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    search("dubai");
  }, []);

  return (
    <div className="weather">
      <div className="head">
        <img src={logo} alt="" height={70} />
        <h1>Weather App</h1>
      </div>

      <Time></Time>
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        <img
          src={Search}
          alt=""
          height={50}
          width={50}
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temprature">{weatherData.temprature}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" height={70} />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind} alt="" height={70} />
          <div>
            <p>{weatherData.wind} km/hr</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
