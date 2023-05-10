const dotenv = require('dotenv')
const {fetchCommitMessages} = require('./lib/fetch-commit-messages')
const {composeReport} = require('./lib/compose-report')
const {sendSlackMessage} = require('./lib/send-slack-message')
const {sendDiscordMessage} = require('./lib/send-discord-message')

dotenv.config()

const main = async () => {
  const daysCount = 7
  const channel = '1105810974189043762'

  const commitMessages = await fetchCommitMessages(daysCount)
  const report = await composeReport(daysCount, commitMessages)

  console.log(report)

  await sendDiscordMessage(channel, report)
}

main()
