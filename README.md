Change Report GitHub Action
---

This action generates a report from the recent code changes and posts it to Slack.

## Usage example

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
          # Number of days to include into the report
          days: 7
          # Slack channel to post the report to
          channel: 'general'
        env:
          # Your OpenAI API key, used to generate the report
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }} 
          # Your Slack bot token, used to post the report on behalf of the bot
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }} 
          # Your Slack signing secret, used to verify the request is coming from Slack
          SLACK_SIGNING_SECRET: ${{ secrets.SLACK_SIGNING_SECRET }} 
```

## Authors

* **Max Prilutskiy** - [@maxprilutskiy](https://twitter.com/maxprilutskiy)

## Roadmap
- [x] Slack integration
- [ ] Discord integration
