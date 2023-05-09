import {OpenAIApi, Configuration} from 'openai'

export const composeReport = async (
  commitMessagesList: string[]
): Promise<string> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY!

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: OPENAI_API_KEY
    })
  )

  const systemPrompt = [
    `You're a software delivery assistant working on an exciting new project.`
  ].join('\n')
  const userPrompt = [
    `You want to write a report summarizing the changes that we have made to the codebase over the last few days given a list of commit messages.`,
    `Write what we've done in the past tense, active voice.`,
    'Summarize in your own words, use simple language, be concise.',
    `Group into sections by topic or by type of work, and order by importance.`,
    'Use emojis where relevant.',
    'Write in Ernest Hemingway style.',
    'Report should be in Slack rich text message format. See https://api.slack.com/reference/surfaces/formatting for details.'
  ].join('\n')

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: systemPrompt},
      {role: 'user', content: userPrompt},
      {role: 'user', content: 'Commit messages:'},
      {role: 'user', content: commitMessagesList.join('\n')}
    ],
    max_tokens: 1024,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    temperature: 0.5,
    top_p: 1,
    n: 1
  })

  const result = response.data.choices[0].message?.content || ''

  return result
}
