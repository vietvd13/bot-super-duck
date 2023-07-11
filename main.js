require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 2000;

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

const { sendMessage } = require('./helpers/index.js');
const config = require("./config/index.json");

const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({ 
  disableEveryone: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
  ],
  'partials': [Partials.Channel]
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async(message) => {
  try {
    await message.channel.sendTyping();

    if (!message.content.startsWith(config.COMMAND_PREFIX) || message.author.bot) {
      return;
    }
  
    const { handleCommand } = require('./commands/index.js');

    handleCommand(client, message);
  } catch (error) {
    console.log(error);
    message.reply(sendMessage(`[Super Duck] - Lỗi rồi bạn ơi!`));
  }
});

const { jobs } = require('./jobs/index.js');
jobs(client);

client.login(config.DISCORD_TOKEN);