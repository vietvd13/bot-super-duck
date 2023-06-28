const axios = require('axios');
const config = require("../../config/index.json");

const getWeather = async (LOCATION = config.OPENWEATHERMAP_LOCATION, LANG = "en") => {
  try {
      const BASE_URL = config.OPENWEATHERMAP_URL_API;
      const API_KEY = config.OPENWEATHERMAP_API_KEY;

      const URL = `${BASE_URL}weather?q=${LOCATION}&units=metric&APPID=${API_KEY}&lang=${LANG}`;

      if (BASE_URL && API_KEY && LOCATION) {
          const { data } = await axios.get(URL);

          if (data.cod === 200) {
              console.log("[SUCCESS] CALL API GET WEATHER");
              return data;
          } else {
              console.log("[ERROR] CALL API GET WEATHER");
              return null;
          }
      } else {
          console.log("[ERROR] CALL API GET WEATHER");
          console.log(`Missing environment variables: BASE_URL: ${BASE_URL}, API_KEY: ${API_KEY}, LOCATION: ${LOCATION}`);
      }
  } catch (error) {
      console.log("[ERROR] CALL API GET WEATHER");
      console.error(error);

      return null;
  }
};

module.exports = {
  getWeather
}