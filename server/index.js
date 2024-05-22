import dotenv from "dotenv"
import express from "express"
import routes from "./routes/index.js"
import { handleErrors, unhandledRejection } from "./middleware/errors.js"
import { cors } from "./middleware/cors.js"
import { envCheck } from "./middleware/env.js"

dotenv.config({ path: [".env", ".env.local"] })
envCheck({ keys: ["BOT_TOKEN", "CHAT_ID"], local: true })

const app = express()
app.use(express.json())
app.use(cors)
app.use(routes)

// errors
app.use(handleErrors)
process.on("unhandledRejection", unhandledRejection) // Global error handling for unhandled promise rejections

app.listen(3000, () => {
  console.log("\x1b[7m\x1b[33m[Server]\x1b[0m Started on port 3000")
})
