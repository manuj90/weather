const container = document.querySelector(".container-box");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDescription = document.querySelector(".weather-description");
const error404 = document.querySelector(".not-found ");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;
  searchCity(city);
});

const searchCity = (city) => {
  const APIKey = "3695cbdccbc2ca1c58c2cbf8d087d0f4";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "25rem";
        weatherBox.style.display = "none";
        weatherDescription.style.display = "none";
        error404.style.display = "block";
        error404.classList.remove("hidden");
        error404.classList.add("visible");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const location = document.querySelector(".weather-box .city");
      const temperature = document.querySelector(".weather-box .temperature");

      const humidity = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "/images/clear.webp";
          break;

        case "Rain":
          image.src = "/images/rain.webp";
          break;

        case "Snow":
          image.src = "/images/snow.webp";
          break;

        case "Clouds":
          image.src = "/images/cloud.webp";
          break;

        case "Haze":
          image.src = "/images/haze.webp";
          break;

        default:
          image.src = "";
      }

      location.innerHTML = `${json.name}`;
      temperature.innerHTML = `${parseInt(json.main.temp)} °C`;
      himidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed} km/h`;

      weatherBox.classList.remove("hidden");
      weatherDescription.classList.remove("hidden");
      weatherBox.classList.add("visible");
      weatherDescription.classList.add("visible");
      container.style.height = "30rem";
    });
};
