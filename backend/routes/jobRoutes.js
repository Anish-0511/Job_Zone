import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs); // to get all jobs
router.post("/post", isAuthenticated, postJob); // jobs are posted when it is authorized means only employer have permit to post jobs
router.get("/getmyjobs", isAuthenticated, getMyJobs); // each employer can fetch its own posted jobs not of others
router.put("/update/:id", isAuthenticated, updateJob); // update:id isliye likha h qki pta chl paye konsi job update krni h
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;