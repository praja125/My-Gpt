import express from "express"
import { getPlans, purchesePlan } from "../controllers/creditController.js"
import { protect } from "../middlewares/auth.js"

const creditRouter = express.Router()

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase', protect, purchesePlan)

export default creditRouter