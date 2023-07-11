const { getWeather } = require('./modules/weather.js');
const { getElectricCutSchedule } = require('./modules/electric.js');
const { handleAskChatGPT } = require('./modules/chatGPT.js');

module.exports = {
    getWeather,
    getElectricCutSchedule,
    handleAskChatGPT
}