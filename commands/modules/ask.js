const { handleAskChatGPT } = require('../../services/index.js');
const { sendMessage } = require('../../helpers/index.js');

async function handleCommandAsk(client, message, command, args) {
  try {
    if (args.length === 0) {
      message.reply(sendMessage("Bạn chưa nhập câu hỏi!"));
    } else {
      const question = args.join(" ");
  
      const data = await handleAskChatGPT(question);

      if (data) {
        message.reply(data);
      } else {
        message.reply(sendMessage("Đã có lỗi xảy ra!"));
      }
    }
  } catch (error) {
    console.log("[ERROR] HANDLE COMMAND ASK");
    console.log(error);

    message.reply(sendMessage("Đã có lỗi xảy ra!"));
  }
}

module.exports = {
  handleCommandAsk
};