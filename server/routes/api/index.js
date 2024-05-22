import express from "express"
import message from "./message.js"
import error from "./error.js"

const router = express.Router()

router.use("/message", message)
router.use("/error", error)

export default router
