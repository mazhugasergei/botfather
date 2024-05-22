export const sendMessage = async (text) => {
  try {
    const response = await fetch("https://api.telegram.org/bot" + process.env.BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    })
    if (!response.ok) throw new Error("Failed to send message")

    return {
      success: true,
      text,
    }
  } catch (error) {
    console.error("Failed to send message:", error)
    throw error
  }
}
