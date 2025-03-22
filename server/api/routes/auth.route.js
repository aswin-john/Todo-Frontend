import express from "express";
import {

  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();
// Handle GET requests to prevent "Cannot GET /api/auth/signup" error
// router.get("/signup", (req, res) => {
//   res.status(405).json({ message: "GET method not allowed. Use POST instead." });
// });

// router.post("/signup", signup);

router.route("/signup")
  .get((req, res) => {
    res.status(405).json({ message: "GET method not allowed. Use POST instead." });
  })       // Handle GET request
  .post(signup)       // Handle POST request (Signup)
  .put((req, res) => {
    res.status(405).json({ message: "put method not allowed. Use POST instead." });
  })    // Handle PUT request (Update user)
  .delete((req, res) => {
    res.status(405).json({ message: "delete method not allowed. Use POST instead." });
  }) // Handle DELETE request (Delete user)

router.post("/signin", signin);
// router.post("/google", google);
router.get("/signout", signout);
export default router;
