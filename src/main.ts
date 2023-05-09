import * as core from '@actions/core'
import {Octokit} from '@octokit/action'

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
    const daysCount = core.getInput('days')
    const commitMessagesList = await fetchCommitMessages(daysCount)

    core.info(`Fetched ${commitMessagesList.length} commit messages:`)
    core.info(commitMessagesList.join('\n'))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

// --

async function fetchCommitMessages(daysCount: string): Promise<string[]> {
  const octokit = new Octokit()

  const now = new Date()
  const startDate = new Date(
    new Date().setDate(now.getDate() - parseInt(daysCount))
  )
  const startDateIso = startDate.toISOString()

  const response = await octokit.rest.repos.listCommits({
    owner: process.env.GITHUB_REPOSITORY_OWNER!,
    repo: process.env.GITHUB_REPOSITORY_NAME!,
    since: startDateIso,
    per_page: 100
  })

  const commitMessagesList = response.data.map(commit => commit.commit.message)

  return commitMessagesList
}
