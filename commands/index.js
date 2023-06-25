const { sendMessage } = require('../helpers/index.js');
const config = require("../config/index.json");

function handleCommand(client, message) {
  let { content } = message;

  content = content.trim();

  console.log("Content: ", content);

  const re = /[^$]*$/;

  let command = content.match(re)[0];

  command = command.toLowerCase();

  if (command) {
    runCommand(client, message, command);
  } else {
    console.log(client, message);
  }
};

function runCommand(client, message, command) {
  switch (command) {
    case "ping": {
      message.reply(sendMessage(`Ping: ${client.ws.ping}ms`));

      break;
    }

    case "test": {
      message.reply(sendMessage(`Bot is running!`));

      break;
    }

    default: {
      message.reply(sendMessage(`Lệnh ${command} không tồn tại!`));

      break;
    }
  }
}

module.exports = {
  handleCommand
};