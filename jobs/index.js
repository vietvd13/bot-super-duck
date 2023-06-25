const cron = require('node-cron');
const config = require("../config/index.json");
const { sendMessage } = require('../helpers/index.js');

const { 
  getWeather,
  getElectricCutSchedule
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

  cron.schedule('0 20 * * *', async() => {
    try {
      console.log("[Super Duck] - Run job get electric cut schedule");

      const data = await getElectricCutSchedule();

      if (data) {
        const len = data.length;
        let idx = 0;

        while (idx < len) {
          const item = data[idx];

          if (item !== null && (item.data).length > 0) {
            sendMessageToChannel(client, `***Lịch cúp điện ngày mai: ${item.name} - (${item.data.length} khu vực)***`);
            
            const lenData = (item.data).length;
            let idxData = 0;

            while (idxData < lenData) {
              sendMessageToChannel(client, sendMessage(`Đơn vị: ${item.data[idxData].tenDonVi}\nThời gian: ${item.data[idxData].khoangThoiGian} | ${item.data[idxData].ngayTHien}\nKhu vực: ${item.data[idxData].khuVuc}\nNội dung: ${item.data[idxData].noidung}\nHình thức đăng ký: ${item.data[idxData].hinhThucDangKy}\nTrạng thái: ${item.data[idxData].trangthai}`));

              idxData++;
            }
          } else {
            console.log(`[Super Duck] - ${item.name} - No electric cut schedule`);
          }

          idx++;
        }
      } else {
        console.log("[Super Duck] - Error when get electric cut schedule");
      }
    } catch (error) {
      console.log(error);
    }
  }, configTimezone);
}

module.exports = {
  jobs
};