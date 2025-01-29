function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.body.style.overflow = "hidden";
  document.getElementById("map-container").style.display = "none";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  document.body.style.overflow = "auto";

  document.getElementById("map-container").style.display = "block";
}

const apiKey = "06bdf57946c84b1e976115717252801";

async function fetchWeather(countries) {
  showLoader();
  const chunkSize = 30; // Number of countries to fetch in parallel
  const results = [];
  // Divide countries into chunks
  const chunks = [];
  for (let i = 0; i < countries.length; i += chunkSize) {
    chunks.push(countries.slice(i, i + chunkSize));
  }

  // Process each chunk
  for (const chunk of chunks) {
    const promises = chunk.map(async ({ country, short }) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`
        );
        const data = await response.json();
        return { country, short, weather: data.current };
      } catch (error) {
        console.error(`Failed to fetch weather for ${country}:`, error);
        return { country, short, weather: null }; // Handle error gracefully
      }
    });
    console.log("again fetching");

    // Fetch all requests in the current chunk
    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }
  hideLoader();
  console.log("end fethcing");
  return results;
}

export default fetchWeather;
