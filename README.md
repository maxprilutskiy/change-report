Change Report GitHub Action
---

This action generates a report from the recent code changes and posts it to Slack or Discord.

### Demo
The report is created taking the commit messages in your repo as an input. Which means, the better you describe your work when committing stuff - the better this action will work for you 😉. 

Here's how the generated change report might look:

```
🚀 Key Changes in Our Project 🚀

We have made some significant changes to our project recently. Here are the most important ones:

📝 Documentation:
- We updated our README with better formatting and added a roadmap section.
- We also added more information about the project and how to use it.

💬 Communication:
- We added support for Discord, so now you can get updates on your Discord channel too!
- We also created a GitHub Action that sends commit summaries to a Slack channel.

🎨 Branding:
- We added branding entries into action.yml.

🔧 Refactoring:
- We tuned up our prompts for better user experience.
- We removed debug comments that were no longer needed.

🐛 Bug Fixes:
- We fixed missing input declarations in action.yml.
```

### Usage example

```yml
name: 'Run'
on:
  workflow_dispatch:
  schedule:
    - cron: '0 10 * * 1' # Run every Monday at 10am UTC

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          # Use a large enough fetch depth to ensure the action can find the commit history to work with
          fetch-depth: 250

      - uses: maxprilutskiy/change-report@main
        with:
          # The destination to post the report to. 
          # "slack" and "discord" are supported
          destination: 'slack'
          # Number of days to include into the report
          days: 7
          # Slack channel to post the report to. 
          # For Slack it's the name of the channel, without the leading "#",
          # For Discord it's the channel ID
          channel: 'general'
        env:
          # Your OpenAI API key, used to generate the report
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }} 
          # Your Slack bot token, used to post the report on behalf of the bot.
          # Only needed if you're posting to Slack
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }} 
          # Your Slack signing secret, used to verify the request is coming from Slack
          # Only needed if you're posting to Slack
          SLACK_SIGNING_SECRET: ${{ secrets.SLACK_SIGNING_SECRET }}
          # Your Discord bot token, used to post the report on behalf of the bot.
          # Only needed if you're posting to Discord
          DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
```

### Authors

* **Max Prilutskiy** - [@maxprilutskiy](https://twitter.com/maxprilutskiy)


### Roadmap
- [x] Slack integration
- [x] Discord integration
