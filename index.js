let ele = document.getElementById("card-container");
let inputEl = document.getElementById("input");
let searchInput = '';

// Listen for changes in the input field
inputEl.addEventListener('input', (event) => {
    searchInput = event.target.value;
});

// API URL and key
const url = 'https://api.openweathermap.org/data/2.5/weather';
const api = '75dca2e3d9c34bb9767273547fc72b84';

// Function to fetch weather data when the button is clicked
let onClickbtn = () => {
    if (!searchInput) {
        ele.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    // let options = {
    //     method: "GET"
    // };
    let url2 = `${url}?q=${searchInput}&appid=${api}&units=metric`;  // units=metric for Celsius

    fetch(url2)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found'); // Handle invalid city names
            }
            return response.json();
        })
        .then(function(jsonData) {
            // Extract relevant weather data
            console.log(jsonData)
            let city = jsonData.name;
            let temp = jsonData.main.temp;  // Temperature in Celsius
            let maxTemp = jsonData.main.temp_max
            let minTemp = jsonData.main.temp_min
            let description = jsonData.weather[0].description;  // Weather description
            let icon = jsonData.weather[0].icon;  // Weather icon

            // Display the weather information in the card-container
            ele.innerHTML = `
                <div class="weather-card">
                    <h2 class="card-heading">Weather in ${city}</h2>
                    <p class="para">Temperature: ${temp}°C</p>
                    <p class="para">Max_Temperature: ${maxTemp}</>
                    <p class="para">Min_Temperature: ${minTemp}</>
                    <p class="para">Condition: ${description}</p>
                    <img class="image" src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                </div>
            `;
        })
        .catch(function(error) {
            ele.innerHTML = `<p>${error.message}</p>`;
        });
};
