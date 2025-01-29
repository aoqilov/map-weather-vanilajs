import { updateGradus, updateWind, updateCloud } from "./typeWeather.js";
import fetchWeather from "./customFetch.js";
import countries from "./countryData.js";

let clientType = "wind";

const clientTypeElement = document.querySelector(".client-type");
clientTypeElement.textContent = clientType;
clientTypeElement.style.backgroundColor = "#6B6B6B";
clientTypeElement.style.color = "white"; // Matn o'qilishi uchun rangni oq qilish
clientTypeElement.style.padding = "2px 10px"; // Qo'shimcha dizayn
clientTypeElement.style.borderRadius = "10px"; // Yumaloq burchaklar

// Matnni qo'shish

// Shamol tezligi knopkasini ko'rsatish uchun, bu aktivligini belgilash.
document.getElementById("btnWind").addEventListener("click", () => {
  clientType = "wind";
  clientTypeElement.textContent = clientType;
  userchoice(clientType);
});

document.getElementById("btnCloud").addEventListener("click", () => {
  clientType = "cloud";
  clientTypeElement.textContent = clientType;
  userchoice(clientType);
});

document.getElementById("btnGradus").addEventListener("click", () => {
  clientType = "gradus";
  clientTypeElement.textContent = clientType;
  userchoice(clientType);
});
let allData = null;
fetchWeather(countries)
  .then((results) => {
    localStorage.setItem("allData", JSON.stringify(results));
    allData = results;
    userchoice("wind");
  })
  .catch((err) => console.error(err));

allData = JSON.parse(localStorage.getItem("allData"))
  ? JSON.parse(localStorage.getItem("allData"))
  : [];

// user chice
function userchoice(clientType) {
  if (clientType == "wind") {
    updateWind(allData);
  } else if (clientType == "gradus") {
    updateGradus(allData);
  } else if (clientType == "cloud") {
    updateCloud(allData);
  }
}
userchoice(clientType);
