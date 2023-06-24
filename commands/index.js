const { sendMessage } = require('../helpers/index.js');
const config = require("../config/index.json");

function handleCommand(client, message) {
  let { content } = message;

  content = content.trim();

  console.log("[Super Duck] - Content: ", content);

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
      message.reply(sendMessage(`[Super Duck] - Pong!`));

      break;
    }

    case "test": {
      client.channels.fetch(config.CHANNEL_ID_RUN_JOB)
      .then(channel=>channel.send('booyah!'))

      break;
    }

    default: {
      message.reply(sendMessage(`[Super Duck] - Lệnh ${command} không tồn tại!`));

      break;
    }
  }
}

module.exports = {
  handleCommand
};