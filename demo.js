/* eslint-disable no-console */
const dotenv = require('dotenv')
const {fetchCommitMessages} = require('./lib/fetch-commit-messages')
const {composeReport} = require('./lib/compose-report')
const {sendSlackMessage} = require('./lib/send-slack-message')

dotenv.config()

const main = async () => {
  const daysCount = 7
  const slackChannelName = 'integrations-test'

  const commitMessages = await fetchCommitMessages(daysCount)
  const report = await composeReport(commitMessages)

  console.log(report)

  await sendSlackMessage(slackChannelName, report)
}

main()
