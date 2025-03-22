import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures task belongs to a user
    },
  },
  { timestamps: true }
);
const Tasks = mongoose.model("Task", TaskSchema);
export default Tasks;
