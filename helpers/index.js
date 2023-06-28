function detachCommand(message) {
  const config = require("../config/index.json");
  const prefix = config.COMMAND_PREFIX;

  if (!message) {
    return {
      status: false,
      message: "Bạn chưa nhập lệnh"
    }
  };

  message = message.trim();

  const args = message.slice(prefix.length).trim().split(/ +/g);

  if (!Array.isArray(args)) {
    return {
      status: false,
      message: "Bạn chưa nhập lệnh"
    }
  }

  if (Array.isArray(args) && args.length === 0) {
    return {
      status: false,
      message: "Bạn chưa nhập lệnh"
    }
  }

  if (args.join("") == "") {
    return {
      status: false,
      message: "Bạn chưa nhập lệnh"
    }
  }

  let command = args.shift();
  command = command.trim();
  command = command.toLowerCase();

  return {
    status: true,
    command,
    args
  }
}

function sendMessage(message) {
  return (`\`\`\`${message}\`\`\``);
}

function getDateTomorrow() {
  const date = new Date(new Date().toLocaleDateString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}));
  const tomorrow = new Date(date.getTime() + 86400000);

  const day = tomorrow.getDate();
  const month = tomorrow.getMonth() + 1;
  const year = tomorrow.getFullYear();

  return `${format2Digits(day)}/${format2Digits(month)}/${year}`;
}

function format2Digits(number) {
  return number < 10 ? `0${number}` : number;
}

module.exports = {
  detachCommand,
  sendMessage,
  getDateTomorrow
}