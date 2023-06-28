const { getWeather } = require('./modules/weather.js');
const { getElectricCutSchedule } = require('./modules/electric.js');

module.exports = {
    getWeather,
    getElectricCutSchedule
}