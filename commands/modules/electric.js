const { sendMessage } = require('../../helpers/index.js');
const { getElectricCutSchedule } = require('../../services/modules/electric.js');

function handleSearchLocation(keyword) {
  const config = require('../../config/index.json');
  const listLocation = config.ENV_LIST_LOCATION;

  const listSearch = [];

  const len = listLocation.length;
  let idx = 0;

  while (idx < len) {
    const location = listLocation[idx];

    if ((location.name.toLowerCase()).includes(keyword.toLowerCase())) {
      listSearch.push(location);
    }

    idx++;
  }

  return listSearch;
}

async function handleSendElectricCutSchedule(message, data = []) {
  const len = data.length;
  let idx = 0;

  while (idx < len) {
    const item = data[idx];

    console.log("item", item);

    if (item !== null && (item.data).length > 0) {
      message.reply(sendMessage(`***Lịch cúp điện ngày mai: ${item.name} - (${item.data.length} khu vực)***`));
      
      const lenData = (item.data).length;
      let idxData = 0;

      while (idxData < lenData) {
        message.reply(sendMessage(`Đơn vị: ${item.data[idxData].tenDonVi}\nThời gian: ${item.data[idxData].khoangThoiGian} | ${item.data[idxData].ngayTHien}\nKhu vực: ${item.data[idxData].khuVuc}\nNội dung: ${item.data[idxData].noidung}\nHình thức đăng ký: ${item.data[idxData].hinhThucDangKy}\nTrạng thái: ${item.data[idxData].trangthai}`));

        idxData++;
      }
    } else {
      message.reply(sendMessage(`Ngày mai không có lịch cất điện tại: ${item.name}`));

      console.log(`[Super Duck] - ${item.name} - No electric cut schedule`);
    }

    idx++;
  }
}

async function handleCommandElectric(client, message, command, args) {
  if (args.length === 0) {
    message.reply(sendMessage("Bạn chưa nhập vị trí cần tra cứu!"));
  } else {
    try {
      const question = args.join(" ");

      const listSearch = handleSearchLocation(question);

      const listSchedule = await getElectricCutSchedule(listSearch);

      await handleSendElectricCutSchedule(message, listSchedule);
    } catch (error) {
      console.log("[ERROR] CALL API GET ELECTRIC: ", error);
      
      message.reply(sendMessage("Đã có lỗi xảy ra trong quá trình lấy dữ liệu!"));
    }
  }
}

module.exports = {
  handleCommandElectric
};