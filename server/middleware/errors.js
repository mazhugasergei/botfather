import { sendMessage } from "../utils/sendMessage.js"

export const handleErrors = async (err, req, res, next) => {
  console.error(err)
  await sendMessage("```\n" + err.stack + "\n```")
  res.status(500).json({ error: err.message })
}

export const unhandledRejection = async (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  await sendMessage("Unhandled Rejection\n```\n" + reason + "\n```")
}
