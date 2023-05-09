import * as core from '@actions/core'
import {fetchCommitMessages} from './fetch-commit-messages'
import {composeReport} from './compose-report'

/**
 * This is the main entry point of the GitHub Action.
 * The github action accepts a number of days as a parameter called "days", name of the Slack channel as "channel",
 * and expects OPENAI_API_KEY, SLACK_BOT_TOKEN, and SLACK_SIGNING_SECRET, GITHUB_TOKEN to be set as an environment variables.
 * This github action retrieves all commit from the branch it runs on over the last "days" days,
 * uses OpenAI api to generate a human readable summary of the changes in markdown format,
 * and posts the summary to the Slack channel.
 */

async function run(): Promise<void> {
  try {
    const daysCount = parseInt(core.getInput('days'))
    const commitMessagesList = await fetchCommitMessages(daysCount)

    core.info(`Fetched ${commitMessagesList.length} commit messages:`)
    core.info(commitMessagesList.join('\n'))

    const report = await composeReport(commitMessagesList)
    core.info('Generated report:')
    core.info(report)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
