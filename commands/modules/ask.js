const { sendMessage } = require('../../helpers/index.js');

function handleCommandAsk(client, message, command, args) {
  if (args.length === 0) {
    message.reply(sendMessage("Bạn chưa nhập câu hỏi!"));
  } else {
    const question = args.join(" ");

    message.reply(sendMessage(`Câu hỏi: ${question}`));
  }
}

module.exports = {
  handleCommandAsk
};