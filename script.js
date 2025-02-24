const apiKey = "fea48751d266154c11975dd61aeef001"; // Vendos çelësin API tënd
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log("Weather Data:", data);

        // Ndrysho vlerat në HTML
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Vendos ikonën e motit
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Shfaq seksionin e motit dhe fsheh mesazhin e gabimit
        weatherDiv.style.display = "block";
        errorDiv.style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        
        // Shfaq mesazhin e gabimit dhe fsheh seksionin e motit
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

// Event listener për butonin e kërkimit
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener për të shtypur "Enter" në tastierë
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});