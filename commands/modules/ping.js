const { sendMessage } = require('../../helpers/index.js');

function handleCommandPing(client, message, command, args) {
  message.reply(sendMessage(`Ping: ${client.ws.ping}ms`));
}

module.exports = {
  handleCommandPing
};