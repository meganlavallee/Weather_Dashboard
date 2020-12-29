let city_name = "";

$("#search-btn").on("click", function (e) {
  e.preventDefault();
  // getCity();
  city_name = $("#Search").val().trim();
  $(".jumbotron").empty();

  getWeather();
  console.log(city_name);
});

// $("#saved-cities").on("click", function (e) {
//     if (!e.target.matches(".savedCities")) return;

//     var saveCity = e.target.id;
//     getWeatherDetails(saveCity, false);
//     console.log(saveCity);
// });

// ajax call to "getWeather()" and set variables needed to run "getWeather()"
function getWeather() {
  const API_Key = "5cc23645c43dae5b8f5251a592a29a62";
  // Current Weather
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${API_Key}`;

  // AJAX Call for Data
  $.ajax({
    url: queryURL,
    type: "GET",
  }).then((data) => {
    console.log(data);

    //     paradameters.lon = data.coord.lon;
    // H3 Tag of Attribute Class with City Temperature and Numbers from Call
    let temperature = $("<h3>")
      .attr("class", "city_temperature")
      .text("Temperature: " + data.main.temp + "F");
    let humidity = $("<h3>")
      .attr("class", "city_humidity")
      .text("Humidity: " + data.main.humidity + "%");
    let speed = $("<h3>")
      .attr("class", "wind_speed")
      .text("Wind Speed: " + data.wind.speed + "mph");
    let feelslike = $("<h3>")
      .attr("class", "wind_speed")
      .text("Feels Like: " + data.main.feels_like + "F");
    //   let description = $("<h3>").attr("class", "description").text("description: " + data.weather.main.description + "")

    // Append and Post Everything On the Webpage
    $(".jumbotron").append(temperature, humidity, speed, feelslike);

    var lat = data.coord.lat;
    var lon = data.coord.lon;

    let secondqueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={part}&appid=${API_Key}`;

    // 7 Day: Temp, Cloud Cover, Humidity
    console.log(lat, lon);

    // Second Request
    $.ajax({
      method: "GET",
      url: secondqueryURL,
    }).then((response) => {
      console.log(response);

      // Temperature, Humidity
      for (let i = 1; i < 6; i++) {
        $("#forecast" + [i]).append(
          $("<h2>")
            .attr("class", "description")
            .text("Temperature: " + response.daily[i].temp.day + "F")
        );

        $("#forecast" + [i]).append(
          $("<h2>")
            .attr("class", "humidity")
            .text("Humidity: " + response.daily[i].humidity + "%")
        );
      }
    });
  });
}

function searchHistory(savedcities) {

  $("#saved-cities").append(
      $("<button>").text(savedcities)
          .attr("class", "btnCity btn-block col btn-outline-info")
          .attr("id", savedcities)
          .text(savedcities)
  );
}
function renderLast(cityOnload) {
  var cityOnload = localStorage.getItem("cityStored");
  if (!cityOnload) {
      return
  }else {
      getWeather(cityOnload, true);
  }
}
$("#saved-cities").on("click", function (e) {
  if (!e.target.matches(".btnCity")) return;

  var savedcities = e.target.id;
  getWeather(savedcities, false);
  console.log(savedcities);
});