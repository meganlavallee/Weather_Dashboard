let city_name = "";

$("#search-btn").on("click", function (e) {
    e.preventDefault();
    // getCity();
    city_name = $("#Search").val().trim();
    getWeather();
});
console.log(city_name)
// ajax call to "getWeather()" and set variables needed to run "getWeather()"
function getWeather() {
    const API_Key = "5cc23645c43dae5b8f5251a592a29a62"

    // Current Weather
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${API_Key}`;
    $.ajax({
        url: queryURL,
        type: "GET",
    }).then((data) => {
        console.log(data);

        // H3 Tag of Attribute Class with City Temperature and Numbers from Call
        let temperature = $("<h3>").attr("class", "city_temperature").text("Temperature: " + data.main.temp + "F");
        let humidity = $("<h3>").attr("class", "city_humidity").text("Humidity: " + data.main.humidity + "%")
        let speed = $("<h3>").attr("class", "wind_speed").text("Wind Speed: " + data.wind.speed + "mph")
        let feelslike = $("<h3>").attr("class", "wind_speed").text("Feels Like: " + data.main.feels_like + "F")
        //   let description = $("<h3>").attr("class", "description").text("description: " + data.weather.main.description + "")

        // Append and Post Everything On the Webpage
        $(".jumbotron").append(temperature, humidity, speed, feelslike)

    });

    // 7 Day: Temp, Cloud Cover, Humidity
    function secondRequest() {
        let secondqueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_Key2}`;

        // LAT AND Long
        let paradameters = { appid: "5cc23645c43dae5b8f5251a592a29a62" };
        paradameters.lat = data.coord.lat;
        paradameters.lon = data.coord.lon;

        // Return Second Request URL
        return secondqueryURL + $.param(paradameters)
    }

    // Putting Together
    let secondqueryURL = secondRequest();

    // Second Request
        $.ajax({
            url: secondqueryURL,
            type: "GET",
        }).then((response) => {
            console.log(response);


            // H3 Tag of Attribute Class with City Temperature and Numbers from Call
            let temperature7 = $("<h2>").attr("class", "temperature").text("Temperature: " + response.main.temp + "F");
            let humidity7 = $("<h2>").attr("class", "humidity").text("Humidity: " + response.main.humidity + "%")
            let cloudcover = $("<h2>").attr("class", "cloud_cover").text("Cloud Cover: " + response.main.clouds + "")


            // // Append and Post Everything On the Webpage
            $(".carousel").append(temperature7, humidity7, cloudcover)

        });
}


// const form = document.querySelector(".top-banner form");

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   const inputVal = input.value;

// msg.textContent = "";
// form.reset();
// input.focus();
// });