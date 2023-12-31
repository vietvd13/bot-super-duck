const { detachCommand } = require('../helpers/index.js');

function handleCommand(client, message) {
  let { content } = message;

  _detachCommand = detachCommand(content);

  if (_detachCommand.status) {
    const { command, args } = _detachCommand;

    runCommand(client, message, command, args);
  }
};

function runCommand(client, message, command, args) {
  const { handleCommandAsk } = require('./modules/ask.js');
  const { handleCommandWeather } = require('./modules/weather.js');
  const { handleCommandElectric } = require('./modules/electric.js');
  const { handleCommandPing } = require('./modules/ping.js');
  const { handleCommandDocs } = require('./modules/docs.js');

  const { handleCommandOther } = require('./modules/other.js');

  const direct = {
    "ask": handleCommandAsk,
    "weather": handleCommandWeather,
    "electric": handleCommandElectric,
    "ping": handleCommandPing,
    "docs": handleCommandDocs,
  };

  if (direct[command]) {
    direct[command](client, message, command, args);
  } else {
    handleCommandOther(client, message, command, args);
  }
}

module.exports = {
  handleCommand
};