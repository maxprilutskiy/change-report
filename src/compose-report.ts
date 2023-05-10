import {OpenAIApi, Configuration} from 'openai'

export const composeReport = async (
  daysCount: number,
  commitMessagesList: string[]
): Promise<string> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY!

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: OPENAI_API_KEY
    })
  )

  const systemPrompt = [
    `You're a software delivery assistant working in a team of software developers (us) developing a software product.`,
    `You're helping our team to write a report about the key changes that we have made to the project over the last ${daysCount} days.`,
    `You're writing a report that will be sent to the rest of our team`,
    `You're taking a list of commit messages as input.`,
    `Your goal is to remind us of what those important and impactful changes that we've recently done are.`,
    'Your goal is to make us feel proud of our work when we deliver something important and impactful.',
    `Your goal is also to push us to do more work when we're not doing much work.`
  ].join('\n')
  const userPrompt = [
    `Write what we've done in the past tense, active voice.`,
    `Start with a title, then a brief summary of the most important changes.`,
    `Group by the type of work, order by importance, and use relevant emojis.`,
    'Squash updates that are not important, or that are too specific into brief summaries.',
    'Write in simple, casual, witty language.',
    'Write in plain text, with no formatting.',
    `Keep it short, but not too short.`
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
    max_tokens: 256,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    temperature: 0.5,
    top_p: 1,
    n: 1
  })

  const result = response.data.choices[0].message?.content || ''

  return result
}
