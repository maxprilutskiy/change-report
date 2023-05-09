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
    `You're a software project management assistant working on a project with a team of other developers.`
  ].join('\n')
  const userPrompt = [
    `You want to write a report summarizing the changes that have been made to the codebase over the last few days given a list of commit messages.`,
    `The report should be written in markdown format and should be easy to read.`,
    `The report should be written in the past tense. The report should be written in the third person, plural form.`,
    `The report should be written in the active voice.`,
    'Summarize in your own words, group into sections by topic or by type of work, and order by importance.',
    'Use emojis where relevant.',
    'Write in Ernest Hemingway style.'
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
