import dotenv from "dotenv"
import express from "express"

dotenv.config({ path: ".env.local" })
if (!process.env.BOT_TOKEN) {
  console.log("Error: missing BOT_TOKEN in .env.local")
  process.exit(1)
}
// const missing = ["BOT_TOKEN"]
//   .map((key) => {
//     if (!process.env[key]) {
//       return key
//     }
//   })
//   .filter(Boolean)

// if (missing.length) {
//   console.log("Error: missing", missing, "in .env.local")
//   process.exit(1)
// }

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
})

const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

const getChatsIds = async () => {
  return await fetch(`${url}/getUpdates`)
    .then((response) => response.json())
    .then((data) => {
      return data.result.map((update) => update.message.chat.id)
    })
    .catch((error) => {
      console.error("Error fetching updates:", error)
    })
}

app.post("/api/sendMessage", async (req, res) => {
  const chatIds = await getChatsIds()
  for (const chatId of chatIds) {
    await fetch(`${url}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: req.body.text,
      }),
    })
      .then((response) => response.json())
      // .then((data) => {
      //   console.log("Message sent:", data)
      // })
      .catch((error) => {
        console.error("Error sending message:", error)
      })
  }

  res.json({ success: true })
})

app.listen(3000, async () => {
  console.log("\x1b[7m\x1b[33m[Server]\x1b[0m Started on port 3000")
})
