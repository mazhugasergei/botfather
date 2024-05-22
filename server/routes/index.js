import express from "express"
import apiRouter from "./api/index.js"

const router = express.Router()

router.use("/api", apiRouter)

export default router
