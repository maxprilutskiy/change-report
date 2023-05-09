/* eslint-disable no-console */
// returns commit messages for the last "daysCount" days
// from the current git repository

import {exec} from 'child_process'
import {promisify} from 'util'

const execAsync = promisify(exec)

const daysCount = 7

const getCommitMessages = async () => {
  const {stdout} = await execAsync(
    `git log --since="${daysCount} days ago" --pretty=format:"%s"`
  )
  return stdout.split('\n').filter(message => message !== '')
}

const main = async () => {
  const commitMessages = await getCommitMessages()
  console.log(commitMessages.join('\n'))
}

main()
