import {exec} from 'child_process'
import {promisify} from 'util'

const execAsync = promisify(exec)

export const fetchCommitMessages = async (
  daysCount: number
): Promise<string[]> => {
  const {stdout} = await execAsync(
    `git log --since="${daysCount} days ago" --pretty=format:"%s"`
  )
  return stdout.split('\n').filter(message => message !== '')
}
