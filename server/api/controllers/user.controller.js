import mongoose from "mongoose";
import Tasks from "../models/Task.js"; // Ensure correct import

// export const getUsersTask = async (req, res, next) => {
//     try {
//         // Check if user is authorized to access their tasks
//         if (req.user.id.toString() !== req.params.id) {
//             return next(errorHandler(403, "You can only view your own tasks"));
//         }

//         // Convert user ID to ObjectId and fetch tasks
//         const userTasks = await Tasks.find({ userId: new mongoose.Types.ObjectId(req.params.id) });

//         res.status(200).json(userTasks);
//     } catch (error) {
//         next(error);
//     }
// };