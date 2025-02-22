import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let API_URL = `http://api.weatherapi.com/v1/current.json?key=2f93eb23b0c84757a9d163446250401&q=${city}&aqi=no`;

    let getWeatherInfo = async () => {
      try{
        if (!city.trim()) return;  

        let response = await fetch(`${API_URL}`);
        let jsonResponse = await response.json();

        let result = {
            city: city,
            condition: jsonResponse.current.condition,  
            cloud: jsonResponse.current.cloud,
            temp_c: jsonResponse.current.temp_c,
            humidity: jsonResponse.current.humidity,
            feelslike: jsonResponse.current.feelslike_c,
            time: jsonResponse.location.localtime,
            country: jsonResponse.location.country,
        };

        console.log(result);
        return result;
      }
      catch(err){
        throw err;
      }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (evt) => {
      try{
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        if (newInfo) updateInfo(newInfo); 
      }
      catch(err){
       setError(true); 
      }  
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <br></br>
                <br></br>
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {
                  error && <p className="error">No such place available in our API</p>
                }
            </form>
        </div>
    );
}
