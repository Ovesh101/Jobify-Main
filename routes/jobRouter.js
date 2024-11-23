import express from "express"
const app = express()
const router = express.Router()
import {getAllJobs , createJob , getJob , updateJob , deleteJob, showStats} from "../controller/jobController.js"
import { validateIdParam, validateJobInput } from "../middleware/validationMiddleware.js"
import { checkForTestUser } from "../middleware/authMiddleware.js"

router.route('/').get(getAllJobs).post( checkForTestUser,  validateJobInput , createJob)

router.route("/stats").get(showStats);
router.route('/:id').get(  validateIdParam , getJob).patch(  checkForTestUser  ,validateJobInput ,   updateJob).delete( checkForTestUser ,validateIdParam , deleteJob)

export default router