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
    `You're writing a report summarizing the key changes that we have made to the project rececntly, taking a list of commit messages as input.`,
    `Write what we've done in the past tense, active voice.`,
    `Group into sections by type of work, and order by business impact, from highest to lowest.`,
    'Summarize in your own words, use simple, witty language, be concise.',
    'Drop updates that are not important, or that are too specific.',
    'Use emojis where relevant.'
  ].join('\n')

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: systemPrompt},
      {role: 'user', content: userPrompt},
      {role: 'user', content: 'Commit messages:'},
      {role: 'user', content: commitMessagesList.join('\n')},
      {role: 'assistant', content: 'Report:'}
    ],
    max_tokens: 512,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    temperature: 0.5,
    top_p: 1,
    n: 1
  })

  const result = response.data.choices[0].message?.content || ''

  return result
}
