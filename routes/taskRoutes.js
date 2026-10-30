import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'

import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}  from "../controllers/taskController.js";

const router = express.Router();

// All task endpoints require authentication
router.use(authMiddleware);

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);
export default router;