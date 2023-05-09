import {App} from '@slack/bolt'

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET

export const sendSlackMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  const app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET
  })

  await app.client.chat.postMessage({
    token: SLACK_BOT_TOKEN,
    channel,
    text: message,
    mrkdwn: true
  })
}
