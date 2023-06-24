const cron = require('node-cron');
const config = require("../config/index.json");
const { sendMessage } = require('../helpers/index.js');

const { 
  getWeather 
} = require('../services/index.js');

const configTimezone = {
  scheduled: true,
  timezone: "Asia/Ho_Chi_Minh",
}

const sendMessageToChannel = (client, message) => {
  client.channels.fetch(config.CHANNEL_ID_RUN_JOB).then(channel => channel.send(message))
};

const jobs = (client) => {
  cron.schedule('30 7 * * *', async() => {
    try {
      console.log("[Super Duck] - Run job get weather");

      const data = await getWeather();

      if (data) {
        const { weather } = data;

        if ((weather[0].description).includes("rain")) {
          sendMessageToChannel(client, `@everyone Hôm nay trời mưa, nhớ mang áo mưa nhé!`);
        }
      } else {
        console.log("[Super Duck] - Error when get weather");
      }
    } catch (error) {
      console.log(error);
    }
  }, configTimezone);
}

module.exports = {
  jobs
};