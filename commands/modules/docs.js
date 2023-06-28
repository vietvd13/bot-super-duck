const { sendMessage } = require('../../helpers/index.js');

function handleCommandDocs(client, message, command, args) {
  message.reply(sendMessage(`SUPER DUCK - HƯỚNG DẪN SỬ DỤNG\n\nLệnh ask: \n- Cú pháp: $ask <câu hỏi>\n- Ví dụ: $ask Bạn có khỏe không?\n- Kết quả: Bot sẽ trả lời câu hỏi của bạn\n\nLệnh weather: \n- Cú pháp: $weather <tên thành phố>\n- Ví dụ: $weather Hà Nội\n- Kết quả: Bot sẽ trả về thông tin thời tiết của thành phố bạn nhập\n\nLệnh ping: \n- Cú pháp: $ping\n- Kết quả: Bot sẽ trả về thời gian ping của bạn\n\nLệnh docs: \n- Cú pháp: $docs\n- Kết quả: Bot sẽ trả về danh sách các lệnh`));
}

module.exports = {
  handleCommandDocs
};