Change Report GitHub Action
---

This action generates a report from the recent code changes and posts it to Slack or Discord.

### Demo
> **Important:** The report is created by taking the commit messages in your repository as input. This means that the more descriptive you are when committing changes, the better this action will work for you 😉. 

Here's an example of how the generated change report might look like. 

So, let's say you have a repository with the following commit history:

```
feat: Develop initial launch plan for SpaceX Internet satellites
chore: Setup project repository for SpaceX Internet satellite launch
refactor: Update satellite design to improve stability and reduce weight
docs: Add user manual for SpaceX Internet service
fix: Correct satellite positioning for optimal Internet coverage
test: Run system tests for satellite deployment and connectivity
build: Prepare launch vehicle for SpaceX Internet satellite deployment
feat: Implement automated satellite monitoring system for real-time status updates
refactor: Optimize satellite power consumption to prolong battery life

... etc
``` 

Then, the generated report might look like this:

```
🚀 SpaceX Internet Satellite Launch Updates 🛰️

In the past 7 days, we've been working hard to improve our SpaceX Internet satellite service. Here are the most important changes that we've made:

🌐 Connectivity:
- Fixed intermittent connection issues
- Addressed DNS resolution issues
- Improved data encryption and security measures
- Implemented adaptive modulation to improve signal quality
- Upgraded satellite antenna design to improve signal reception

📱 User Experience:
- Introduced SpaceX Internet app for easy access to service
- Added troubleshooting guide and FAQ section to documentation
- Improved user interface for SpaceX Internet app

💻 Technical Improvements:
- Upgraded ground station hardware to improve signal processing
- Optimized satellite orbit to minimize signal latency
- Implemented machine learning algorithms to optimize bandwidth allocation

🚀 Deployment:
- Launched additional satellites to increase coverage area and redundancy 
- Prepared for launch of new satellites with improved signal processing capabilities 
- Introduced SpaceX Internet service in international markets 
```


The report might look slightly differently in your case, as it depends on the commit messages.

### Usage example

```yml
name: 'Change Report'
on:
  workflow_dispatch:
  schedule:
    - cron: '0 10 * * 1' # Run every Monday at 10am UTC

jobs:
  change-report:
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
