const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const displayArea = document.getElementById('weather-info');

// REPLACE THIS with your actual key from OpenWeatherMap
const apiKey = 'bd88176c4945f3fa45a842ee947ef237'; 

searchBtn.addEventListener('click', async () => {
    const cityName = cityInput.value;

    if (cityName === "") {
        displayArea.innerHTML = "<p style='color: #e74c3c;'>Please enter a city name!</p>";
        return;
    }

    displayArea.innerHTML = "<p>Fetching weather data...</p>";

    try {
        // 1. The Request: Calling the OpenWeather API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        // 2. The Check: Did the API find the city?
        if (!response.ok) {
            throw new Error("City not found. Try again!");
        }

        // 3. The Data: Converting the response to JSON format
        const data = await response.json();

        // 4. The UI Update: Using your UX/UI eye to display the results

       // This goes inside your 'try' block, after you get the 'data'
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        displayArea.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" alt="Weather icon">
            <div style="font-size: 3rem; font-weight: bold; margin: 10px 0;">
                ${Math.round(data.main.temp)}°C
            </div>
            <p style="text-transform: capitalize;">${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;  

        const temp = data.main.temp;

        if (temp > 28) {
            document.body.style.background = "linear-gradient(135deg, #f83600, #f9d423)"; // Warm colors
        } else if (temp < 15) {
            document.body.style.background = "linear-gradient(135deg, #00c6fb, #005bea)"; // Cold colors
        } else {
            document.body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)"; // Default
        }

    } catch (error) {
        // 5. Error Handling: Vital for good UX
        displayArea.innerHTML = `<p style="color: #e74c3c;">${error.message}</p>`;
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});