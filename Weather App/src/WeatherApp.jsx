import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";
import { useState } from "react";

export default function WeatherApp() {  
    const [weatherInfo, setWeatherInfo] = useState({
        cloud: 75,
        condition: { text: "Mist", icon: "//cdn.weatherapi.com/weather/64x64/day/143.png", code: 1006 }, 
        country: "India",
        feelslike: 28.3,
        humidity: 74,
        temp_c: 27.3,
        time: "2025-02-22 19:26",
        city: "Kolkata",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div className="WeatherApp">
            <h1>Weather App</h1>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}
