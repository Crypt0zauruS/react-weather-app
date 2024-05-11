import "./App.css";
import React, { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [apiData, setApiData] = useState(null);
  const [celsius, setCelsius] = useState(true);
  // if you want to use openweathermap
  // add an .env file to the root of your project and add the following line:
  // REACT_APP_API_KEY='your_openweathermap_api_key'
  // and then uncomment the following line:
  // const apiKey = process.env.REACT_APP_API_KEY;

  const handleCoords = function () {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // if you want to use openweathermap, use:
      //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const url = `https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${latitude}`;
      fetch(url)
        .then((res) => res.json(url))
        .then((data) => setApiData(data))
        .catch((err) => console.log(err));
    });
  };

  // if you want to use openweathermap, use these 2 functions and comment out celsiusToFarenheit()

  //const kelvinToCelsius = (k) => {
  //  return (k - 273.15).toFixed(2);
  //};

  //const kelvinToFarenheit = (k) => {
  //  return ((k - 273.15) * 1.8 + 32).toFixed(2);
  //};

  const celsiusToFarenheit = (k) => {
    return (k * 1.8 + 32).toFixed(2);
  };

  useEffect(() => {
    handleCoords();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="card mt-3 mx-auto">
          {apiData ? (
            <div className="card-body text-center">
              <img
                src={require(`./pictures/${apiData.weather[0].main}.jpg`)}
                alt="weather background"
                className="background-weather"
              ></img>
              <hr />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCelsius(!celsius)}
              >
                {celsius ? <span>&deg; F</span> : <span>&deg; C</span>}
              </button>
              {/*
              if you want to use openweathermap, use these line for src
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              */}
              <img
                src={apiData.weather[0].icon}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {celsius
                  ? // if you want to use openweathermap, use these lines
                    //? kelvinToCelsius(apiData.main.temp) + " °C"
                    //: kelvinToFarenheit(apiData.main.temp) + " °F"}
                    // comment out these 2 lines below
                    apiData.main.temp + " °C"
                  : celsiusToFarenheit(apiData.main.temp) + " °F"}
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i className="fas fa-temperature-low "></i>{" "}
                    <strong>
                      {celsius
                        ? // if you want to use openweathermap, use these lines
                          //? kelvinToCelsius(apiData.main.temp_min) + " °C"
                          //: kelvinToFarenheit(apiData.main.temp_min) + " °F"}
                          // comment out these 2 lines below
                          apiData.main.temp_min + " °C"
                        : celsiusToFarenheit(apiData.main.temp_min) + " °F"}
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{" "}
                    <strong>
                      {celsius
                        ? // if you want to use openweathermap, use these lines
                          //? kelvinToCelsius(apiData.main.temp_max) + " °C"
                          //: kelvinToFarenheit(apiData.main.temp_max) + " °F"}
                          // comment out these 2 lines below
                          apiData.main.temp_max + " °C"
                        : celsiusToFarenheit(apiData.main.temp_max) + " °F"}
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {" "}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    {" "}
                    <strong>
                      {"Humidity: " + apiData.main.humidity + "%"}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                marginTop: "120px",
                minHeight: "200px",
              }}
            >
              <CircleLoader color="#36d7b7" />
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        &copy; Copyright by Crypt0zauruS
        <h1>
          Follow me on{" "}
          <a
            className="github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Crypt0zauruS"
          >
            <i className="fab fa-github"></i>
          </a>
        </h1>
      </div>
    </div>
  );
}

export default App;
