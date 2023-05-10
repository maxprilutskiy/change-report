import Discord from 'discord.js'

export const sendDiscordMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  const discord = new Discord.Client({
    intents: []
  })
  await discord.login(process.env.DISCORD_BOT_TOKEN)

  const discordChannel = await discord.channels.fetch(String(channel))

  if (!discordChannel) {
    throw new Error(`Discord channel ${channel} not found`)
  }

  if (!discordChannel.isTextBased()) {
    throw new Error(`Discord channel ${channel} is not text-based`)
  }

  await discordChannel.send(
    Discord.MessagePayload.create(discordChannel, {
      content: message
    })
  )

  discord.destroy()
}
