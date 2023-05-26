import axios from "axios";

export async function discordNotifier(content: string) {
  const webHookUrl = process.env.DISCORD_WEB_HOOK_URL;
  if(!webHookUrl) return
  const data = { content };
  try {
    await axios.post(webHookUrl, data);
  } catch (error) {
    console.error(`Failed to send error to Discord: ${error}`);
  }
}
