$("#search-btn").on("click", function () {
    getWeather();
    getCity();
});

// ajax call to "getWeather()" and set variables needed to run "getWeather()"
function getWeather() {
    var queryURL = "http://api.weatherbit.io/v2.0/current";
    $.ajax({
        url: queryURL,
        type: "GET",
    }).then(() => {
        console.log(dinner);


    });
}

const form = document.querySelector(".top-banner form");
 
form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;

msg.textContent = "";
form.reset();
input.focus();
});