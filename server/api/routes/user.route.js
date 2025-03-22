import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { createTask, deleteTask, getTaskListings, getTasks, updateTask } from "../controllers/Task.controller.js";
import { getUsersTask } from "../controllers/user.controller.js";

const router = express.Router();
// Handle GET requests to prevent "Cannot GET /api/auth/signup" error
// router.get("/signup", (req, res) => {
//   res.status(405).json({ message: "GET method not allowed. Use POST instead." });
// });

// router.post("/signup", signup);
// router
//   .route("/tasks")
//   .get(verifyToken,getUsersTask)
//   .post((req, res) => {
//     res.status(405).json({ message: "PUT method not allowed. Use POST instead." });
//   }) // ✅ Middleware correctly applied
//   .put((req, res) => {
//     res.status(405).json({ message: "PUT method not allowed. Use POST instead." });
//   })
//   .delete((req, res) => {
//     res.status(405).json({ message: "DELETE method not allowed. Use POST instead." });
//   });




export default router;
