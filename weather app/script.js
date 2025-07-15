const API_KEY = "1d314dfd5aae6492ac14b5b3b5c531de"; // Your OpenWeather API key

window.onload = () => {
  getWeather("Delhi");
};

function getWeather(city = null) {
  const cityName = city || document.getElementById("cityInput").value;
  if (!cityName) return;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  fetch(weatherURL)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        const { name, main, weather, wind, coord } = data;
        document.getElementById("weatherResult").innerHTML = `
          <h2>Weather in ${name}</h2>
          <p><strong>Temperature:</strong> ${main.temp} °C</p>
          <p><strong>Condition:</strong> ${weather[0].main}</p>
          <p><strong>Humidity:</strong> ${main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        `;

        // Embed OpenStreetMap using coordinates
        const lat = coord.lat;
        const lon = coord.lon;
        const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
          lon - 0.05
        }%2C${lat - 0.05}%2C${lon + 0.05}%2C${
          lat + 0.05
        }&layer=mapnik&marker=${lat}%2C${lon}`;
        document.getElementById("cityMap").src = mapSrc;
      } else {
        document.getElementById("weatherResult").innerHTML =
          "<p>City not found!</p>";
        document.getElementById("cityMap").src = "";
      }
    })
    .catch((err) => {
      document.getElementById("weatherResult").innerHTML =
        "<p>Error fetching weather data.</p>";
      console.error(err);
    });
}
