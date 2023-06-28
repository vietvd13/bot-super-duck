const { sendMessage } = require('../../helpers/index.js');

function handleCommandOther(client, message, command, args) {
  message.reply(sendMessage(`Lệnh ${command} không tồn tại!!`));
}

module.exports = {
  handleCommandOther
};