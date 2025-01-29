// eski xaritani ochirish
function clearMap() {
  if (window.currentMap) {
    document.getElementById("karta").innerHTML = "";
    window.currentMap = null;
  }
}

function updateWind(data) {
  clearMap();
  const mapData = {};

  data.forEach(({ short, weather }) => {
    let fillKey;
    if (weather.wind_kph < 3) {
      fillKey = "LIGHT_CYAN";
    } else if (weather.wind_kph < 6) {
      fillKey = "PALE_BLUE";
    } else if (weather.wind_kph < 9) {
      fillKey = "SOFT_TEAL";
    } else if (weather.wind_kph < 12) {
      fillKey = "BRIGHT_BLUE";
    } else {
      fillKey = "DEEP_NAVY_BLUE";
    }

    mapData[short] = {
      fillKey,
      cloud: weather.cloud,
      gradus: weather.temp_c,
      wind: weather.wind_kph,
    };
  });

  window.currentMap = new Datamap({
    element: document.getElementById("karta"),
    fills: {
      LIGHT_CYAN: "#E0F7FA",
      PALE_BLUE: "#B2EBF2",
      SOFT_TEAL: "#4DD0E1",
      BRIGHT_BLUE: "#0288D1",
      DEEP_NAVY_BLUE: "#01579B",
      defaultFill: "green",
    },
    data: mapData,
    geographyConfig: {
      popupTemplate: function (geo, data) {
        return [
          `<div class="hover-info">`,
          "<h5>country: " + geo.properties.name + "</h5>",
          '<p><i class="bi bi-wind"></i> wind: ' + data.wind + ",</p>",
          '<p><i class="bi bi-thermometer-half"></i> gradus: ' +
            data.gradus +
            "</p>",
          '<p><i class="bi bi-cloud"></i> cloud: ' + data.cloud + "</p>",
          "</div>",
        ].join("");
      },
    },
  });
  window.currentMap.legend();
}

function updateGradus(data) {
  clearMap();
  const mapData = {};

  data.forEach(({ short, weather }) => {
    let fillKey;

    // Map temperature ranges to fill keys based on provided temperature scale
    if (weather.temp_c <= -30) {
      fillKey = "DEEP_BLUE";
    } else if (weather.temp_c <= -20) {
      fillKey = "ICE_BLUE";
    } else if (weather.temp_c <= -10) {
      fillKey = "LIGHT_BLUE";
    } else if (weather.temp_c <= 0) {
      fillKey = "PALE_GRAYISH_BLUE";
    } else if (weather.temp_c <= 10) {
      fillKey = "LIGHT_GREEN";
    } else if (weather.temp_c <= 20) {
      fillKey = "SOFT_YELLOW";
    } else if (weather.temp_c <= 30) {
      fillKey = "LIGHT_ORANGE";
    } else {
      fillKey = "DEEP_ORANGE";
    }

    mapData[short] = {
      fillKey,
      cloud: weather.cloud,
      gradus: weather.temp_c,
      wind: weather.wind_kph,
    };
  });

  window.currentMap = new Datamap({
    element: document.getElementById("karta"),
    fills: {
      DEEP_BLUE: "#003366",
      ICE_BLUE: "#4A90E2",
      LIGHT_BLUE: "#B3DFFD",
      PALE_GRAYISH_BLUE: "#E6F7FF",
      LIGHT_GREEN: "#D1F2D3",
      SOFT_YELLOW: "#FFFACD",
      LIGHT_ORANGE: "#FFCC80",
      DEEP_ORANGE: "#FF7043",
      defaultFill: "green",
    },
    data: mapData,
    geographyConfig: {
      popupTemplate: function (geo, data) {
        return [
          `<div class="hover-info">`,
          "<h5>country: " + geo.properties.name + "</h5>",
          '<p><i class="bi bi-wind"></i> wind: ' + data.wind + ",</p>",
          '<p><i class="bi bi-thermometer-half"></i> gradus: ' +
            data.gradus +
            "</p>",
          '<p><i class="bi bi-cloud"></i> cloud: ' + data.cloud + "</p>",
          "</div>",
        ].join("");
      },
    },
  });
  window.currentMap.legend();
}

function updateCloud(data) {
  clearMap();
  const mapData = {};
  data.forEach(({ short, weather }) => {
    let fillKey;
    if (weather.cloud <= 10) {
      fillKey = "LIGHT_YELLOW";
    } else if (weather.cloud <= 30) {
      fillKey = "SOFT_YELLOW";
    } else if (weather.cloud <= 60) {
      fillKey = "LIGHT_GRAY";
    } else if (weather.cloud <= 90) {
      fillKey = "GRAY";
    } else {
      fillKey = "DARK_GRAY";
    }
    mapData[short] = {
      fillKey,
      cloud: weather.cloud,
      gradus: weather.temp_c,
      wind: weather.wind_kph,
    };
  });

  window.currentMap = new Datamap({
    element: document.getElementById("karta"),
    fills: {
      LIGHT_YELLOW: "#FFF9C4",
      SOFT_YELLOW: "#FFF176",
      LIGHT_GRAY: "#E0E0E0",
      GRAY: "#9E9E9E",
      DARK_GRAY: "#616161",
      defaultFill: "green",
    },
    data: mapData,
    geographyConfig: {
      popupTemplate: function (geo, data) {
        return [
          `<div class="hover-info">`,
          "<h5>country: " + geo.properties.name + "</h5>",
          '<p><i class="bi bi-wind"></i> wind: ' + data.wind + ",</p>",
          '<p><i class="bi bi-thermometer-half"></i> gradus: ' +
            data.gradus +
            "</p>",
          '<p><i class="bi bi-cloud"></i> cloud: ' + data.cloud + "</p>",
          "</div>",
        ].join("");
      },
    },
  });

  window.currentMap.legend();
}

export { updateWind, updateGradus, updateCloud };
