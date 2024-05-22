import express from "express"
import { sendMessage } from "../../utils/sendMessage.js"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    await sendMessage(req.body.text)
    res.json({ success: true, text: req.body.text })
  } catch (err) {
    next(err)
  }
})

export default router
