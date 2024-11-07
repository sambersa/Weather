function getWeather() {
    var city = document.getElementById("city").value;

    if (city) {
        // Fetch weather data based on the city entered
        fetch(`/weather?city=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Display error message if any
                    document.getElementById("weatherResult").innerHTML = `<p id="error">${data.error}</p>`;
                } else {
                    // If valid data, update the weather card with fetched data
                    document.getElementById("cityName").textContent = `Weather in ${data.city}`;
                    document.getElementById("temperature").textContent = `${data.temperature}°C`;
                    document.getElementById("description").textContent = data.description;
                    document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
                    document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind_speed} m/s`;

                    // Set the weather icon dynamically
                    document.getElementById("weatherIcon").src = `/static/weather.png`; // Or use any other weather icon PNG source.

                    // Hide the initial message
                    document.getElementById("enterCityMessage").style.display = "none";

                    // Show the weather card now that the data is fetched
                    document.getElementById("weatherCard").classList.remove("hidden");
                    document.getElementById("weatherCard").classList.add("show");

                    // Hide the weatherResult section if it was previously showing
                    document.getElementById("weatherResult").innerHTML = "";
                }
            })
            .catch(error => {
                // Handle any errors during fetch request
                document.getElementById("weatherResult").innerHTML = `<p id="error">Error fetching weather data</p>`;
            });
    } else {
        // If no city is entered, prompt the user
        document.getElementById("weatherResult").innerHTML = `<p id="error">Please enter a city name</p>`;
    }
}
