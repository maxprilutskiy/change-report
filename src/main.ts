import * as core from '@actions/core'
import {fetchCommitMessages} from './fetch-commit-messages'
import {composeReport} from './compose-report'
import {sendSlackMessage} from './send-slack-message'

async function run(): Promise<void> {
  try {
    const daysCount = parseInt(core.getInput('days'))
    const commitMessagesList = await fetchCommitMessages(daysCount)

    core.info(`Fetched ${commitMessagesList.length} commit messages:`)
    core.info(commitMessagesList.join('\n'))

    if (commitMessagesList.length === 0) {
      core.info('No commit messages found. Skipping report generation.')
      return
    }

    const report = await composeReport(commitMessagesList)
    core.info('Generated report:')
    core.info(report)

    if (!report) {
      throw new Error('Failed to generate report')
    }

    const channel = core.getInput('channel')
    await sendSlackMessage(channel, report)

    core.info('Sent report to Slack')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
