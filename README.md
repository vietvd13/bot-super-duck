## Super Duck
Feature:
- Check ping
- Check the bot works
- Automatically reminding it to rain every morning (At 7:30 am)
- Automatically check the schedule for tomorrow's power cut in Hanoi (Automatically sent at 8pm the previous day)

## Requirements
- Node 19.1.0 
- Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/vietvd13/bot-super-duck.git
cd bot-super-duck
```

```bash
npm install
```

Configuration information of the bot (config/index.json)
```bash
{
  "DISCORD_APPLICATION_ID": "DISCORD_APPLICATION_ID",
  "DISCORD_PUBLIC_KEY": "DISCORD_PUBLIC_KEY",
  "DISCORD_TOKEN": "DISCORD_TOKEN",

  "COMMAND_PREFIX": "$",

  "CHANNEL_ID_RUN_JOB": "The ID of the channel you want the bot to automatically send every day",

  "OPENWEATHERMAP_URL_API": "https://api.openweathermap.org/data/2.5/",
  "OPENWEATHERMAP_API_KEY": "OPENWEATHERMAP_API_KEY",
  "OPENWEATHERMAP_LOCATION": "Location to get weather information"
}
```

To start the express server, run the following
```bash
npm run start
```
