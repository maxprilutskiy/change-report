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
    `You're writing a report about the key changes that we have made to the project rececntly, taking a list of commit messages as input.`,
    `Write what we've done in the past tense, active voice.`,
    `Start with a title, then a brief summary of the most important changes.`,
    `Group into sections by the type of work, use emoji in the section titles.`,
    'Squash updates that are not important, or that are too specific into brief summaries.',
    'Use simple, casual, witty language.',
    `Don't use jargon, or words that are too technical or specific.`,
    `Don't use markdown, or any other formatting.`
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
