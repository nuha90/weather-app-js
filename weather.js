const cityButton = document.getElementById("city-name");

cityButton.addEventListener("click", () => {
  let cityName = document.querySelector("input").value;

  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=4fdf58b7e131574d042a604479aa86ab" +
    "&units=metric";
  if (cityName != "" && cityName != null) {
    fetch(url)
      .then(response => response.json())
      .then(weather => {
        let img = document.querySelector("img");
        img.src = ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

        let city = document.querySelector(".city");
        city.innerHTML = `${weather.name}`;

        let date = document.querySelector(".location .date");
        date.innerText = currentDate(new Date());

        let temp = document.querySelector(".temp");
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

        let weatherDescription = document.querySelector(".weather");
        weatherDescription.innerHTML = `${weather.weather[0].description}`;
      });
  } else {
    alert("enter the city name");
  }
});
const currentDate = d => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function myLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let latiTude = position.coords.latitude;
      let longiTude = position.coords.longitude;
      let url =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latiTude +
        "&lon=" +
        longiTude +
        "&appid=4fdf58b7e131574d042a604479aa86ab";
      fetch(url)
        .then(response => response.json())
        .then(UserLocationWeather => {
          let img = document.querySelector("img");
          img.src = ` http://openweathermap.org/img/wn/${UserLocationWeather.weather[0].icon}@2x.png`;

          const h1 = document.createElement("h1");
          let city = document.querySelector(".city");
          city.innerHTML = `${UserLocationWeather.name}`;

          let date = document.querySelector(".location .date");
          date.innerText = currentDate(new Date());

          let temp = document.querySelector(".temp");
          temp.innerHTML = `${Math.round(
            UserLocationWeather.main.temp - 273.15
          )}<span>°c</span>`;

          let weatherDescription = document.querySelector(".weather");
          weatherDescription.innerHTML = `${UserLocationWeather.weather[0].description}`;
        });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
window.onload = myLocation;
