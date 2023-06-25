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
  sendMessage,
  getDateTomorrow
}