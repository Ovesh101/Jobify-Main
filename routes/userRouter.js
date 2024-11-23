import express from "express"
const app = express()
const router = express.Router()
import { register , login, logout } from "../controller/userController.js"
import { validateRegisterInput , validateLoginInput } from "../middleware/validationMiddleware.js"


router.route("/register").post(  validateRegisterInput , register)
router.route("/login").post( validateLoginInput , login)
router.route("/logout").get( logout)

export default router