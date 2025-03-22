import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { createTask, deleteTask, getTaskListings, getTasks, updateTask } from "../controllers/Task.controller.js";

const router = express.Router();
// Handle GET requests to prevent "Cannot GET /api/auth/signup" error
// router.get("/signup", (req, res) => {
//   res.status(405).json({ message: "GET method not allowed. Use POST instead." });
// });

// router.post("/signup", signup);
router
  .route("/tasks")
  .get(verifyToken,getTaskListings)
  .post(verifyToken, createTask) // ✅ Middleware correctly applied
  .put((req, res) => {
    res.status(405).json({ message: "PUT method not allowed. Use POST instead." });
  })
  .delete((req, res) => {
    res.status(405).json({ message: "DELETE method not allowed. Use POST instead." });
  });

  router
  .route("/tasks/:id")
  .get(verifyToken,getTasks)
  .put(verifyToken,updateTask) // ✅ Middleware correctly applied
  .post((req, res) => {
    res.status(405).json({ message: "PUT method not allowed. Use GET instead." });
  })
  .delete(verifyToken,deleteTask);


export default router;
