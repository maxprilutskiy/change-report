import * as core from '@actions/core'
import {fetchCommitMessages} from './fetch-commit-messages'
import {composeReport} from './compose-report'
import {sendSlackMessage} from './send-slack-message'
import {sendDiscordMessage} from './send-discord-message'

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

    const report = await composeReport(daysCount, commitMessagesList)
    core.info('Generated report:')
    core.info(report)

    if (!report) {
      throw new Error('Failed to generate report')
    }

    const destination = core.getInput('destination')
    const channel = core.getInput('channel')
    if (destination === 'slack') {
      await sendSlackMessage(channel, report)
    } else if (destination === 'discord') {
      await sendDiscordMessage(channel, report)
    } else {
      throw new Error(`Unknown destination: ${destination}`)
    }

    core.info('Report sent')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
