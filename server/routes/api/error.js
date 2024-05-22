import express from "express"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    throw new Error("Simulated error, just ignore")
  } catch (error) {
    next(error)
  }
})

export default router
