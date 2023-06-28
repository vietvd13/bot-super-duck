const { sendMessage } = require('../../helpers/index.js');
const { getWeather } = require('../../services/index.js');

function handleMessage(data) {
  return `${data.name} hiện tại: ${(data.weather[0].description).toLocaleUpperCase()}\nNhiệt độ: ${data.main.temp} °C\nĐộ ẩm: ${data.main.humidity} %\nTốc độ gió: ${data.wind.speed} m/s\nÁp suất: ${data.main.pressure} hPa`;
}

async function handleCommandWeather(client, message, command, args) {
  try {
    if (!args) {
      message.reply(sendMessage(`Bạn chưa nhập tên thành phố`));
  
      return;
    }
  
    const location = args.join(" ");
  
    const data = await getWeather(location, "vi");
  
    if (data) {
      console.log(data);
  
      message.reply(sendMessage(handleMessage(data)));
    } else {
      message.reply(sendMessage(`Không tìm thấy thông tin thời tiết cho thành phố ${location}`));
    }
  } catch (error) {
    message.reply(sendMessage(`Đã có lỗi xảy ra, vui lòng thử lại sau`));
    
    console.log("[ERROR] HANDLE COMMAND WEATHER");
    console.error(error);
  }
}

module.exports = {
  handleCommandWeather
};