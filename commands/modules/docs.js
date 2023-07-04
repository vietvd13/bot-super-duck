const { sendMessage } = require('../../helpers/index.js');

function handleCommandDocs(client, message, command, args) {
  message.reply(sendMessage(`SUPER DUCK - HƯỚNG DẪN SỬ DỤNG\n\nLệnh ask: \n- Cú pháp: $ask <câu hỏi>\n- Ví dụ: $ask Bạn có khỏe không?\n- Kết quả: Bot sẽ trả lời câu hỏi của bạn\n\nLệnh weather: \n- lệnh: $weather\n- Ví dụ: $weather Hà Nội\n- Kết quả: Bot sẽ trả về thông tin thời tiết của thành phố bạn nhập\n\nLệnh electric:\n- Cú pháp: $electric <tên quận, huyện tại Hà Nội>\n- Ví dụ: $eletric Thanh Xuân\n- Kêt quả: Bot sẽ trả về thông tin lịch cắt điện tại các quận huyện theo từ khoá tìm kiếm\n\nLệnh ping: \n- Cú pháp: $ping\n- Kết quả: Bot sẽ trả về thời gian ping của bạn\n\nLệnh docs: \n- Cú pháp: $docs\n- Kết quả: Bot sẽ trả về danh sách các lệnh`));
}

module.exports = {
  handleCommandDocs
};