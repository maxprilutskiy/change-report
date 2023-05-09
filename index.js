/* eslint-disable no-console */
const dotenv = require('dotenv')
const {fetchCommitMessages} = require('./lib/fetch-commit-messages')
const {composeReport} = require('./lib/compose-report')

dotenv.config()

const main = async () => {
  const daysCount = 7

  console.log(process.env.OPENAI_API_KEY)

  const commitMessages = await fetchCommitMessages(daysCount)
  const report = await composeReport(commitMessages)

  console.log(report)
}

main()
