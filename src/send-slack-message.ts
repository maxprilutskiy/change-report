import {App} from '@slack/bolt'

export const sendSlackMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!
  })

  await app.client.chat.postMessage({
    channel,
    mrkdwn: true,
    text: 'Codebase changes summary',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message
        }
      }
    ]
  })
}
