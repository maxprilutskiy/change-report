Change Report GitHub Action
---

This action generates a report from the recent code changes and posts it to Slack.

## Usage example

```yaml
name: 'Run'
on:
  workflow_dispatch:
  schedule:
    - cron: '0 10 * * 1' # Run every Monday at 10am UTC

jobs:
  run: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 250 # Use a large enough fetch depth to ensure the action can find the commit history to work with

      - uses: maxprilutskiy/change-report@main
        with:
          days: 7 # Number of days to include into the report
          channel: 'general' # Slack channel to post the report to
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }} # Your OpenAI API key, used to generate the report
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }} # Your Slack bot token, used to post the report on behalf of the bot
          SLACK_SIGNING_SECRET: ${{ secrets.SLACK_SIGNING_SECRET }} # Your Slack signing secret, used to verify the request is coming from Slack
```

## Authors

* **Max Prilutskiy** - *Initial work* - [@maxprilutskiy](https://twitter.com/maxprilutskiy)
