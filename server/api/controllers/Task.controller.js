
import Tasks from "../models/Task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
    try {
      //Ensure user is authenticated (userId from token)

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
      }

      const { title, description, status, dueDate, priority } = req.body;

      // Validation: Ensure title exists and is not empty
      if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
      }

      //Validation: Ensure status is valid (if provided)
      const validStatuses = ["pending", "in_progress", "completed"];
      if (status && !validStatuses.includes(status)) {

        return res.status(400).json({ message: "Invalid status value" });

      }

      //Validation: Ensure priority is valid (if provided)
      const validPriorities = ["low", "medium", "high"];
      if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }

      // Validation: Ensure dueDate is a valid date (if provided)
      if (dueDate && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ message: "Invalid dueDate format" });
      }

      //Create a new task with the validated data
      const Task = await Tasks.create({
        title,
        description,
        status: status || "pending", // Default if not provided
        dueDate,
        priority: priority || "medium", // Default if not provided
        userId: req.user.id, // ✅ Assign userId from authenticated user
      });

      return res.status(201).json({ task: Task, message: 'Task created successfully' });
    } catch (error) {
      next(error);
    }
  };
  export const getTasks = async (req, res, next) => {
    try {
      const TasksList = await Tasks.findById(req.params.id);

      if (!TasksList) {
        return next(errorHandler(404, "listing not found"));
      }
      res.status(200).json({data:[TasksList],message:'Task retrieved successfully'});
    } catch (error) {
      next(errorHandler(500, "Task does  not exist"));
      // next(error);
    }
  };

  export const deleteTask = async (req, res, next) => {
    const Task = await Tasks.findById(req.params.id);
    console.log('this user task >>',Task);
    console.log('this user user id >>',req.user.id);
    if (!Task) {
      return next(errorHandler(404, "listing not found"));
    }
    if (req.user.id !== Task.userId.toString()) {
      return next(errorHandler(404, "you can only  delete your own listing "));
    }
    try {
      await Tasks.findByIdAndDelete(req.params.id);
      res.status(200).json("Task has been deleted");
    } catch (error) {
      next(error);
    }
  };
  export const updateTask = async (req, res, next) => {
    const Task = await Tasks.findById(req.params.id);
    if (!Task) {
      return next(errorHandler(404, "listing not found"));
    }
    if (req.user.id !== Task.userId.toString()) {
      return next(errorHandler(401, "you can update your own listing"));
    }
     // Validate request body: Allow only defined schema fields
     const allowedFields = ["title", "description", "status", "dueDate", "priority"];
     const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

     if (invalidFields.length > 0) {
         return next(errorHandler(400, `Invalid fields: ${invalidFields.join(", ")}`));
     }
    try {
      const updatedTask = await Tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };

  export const getTaskListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = parseInt(req.query.startIndex) || 0;

      // Search by title or description
      const searchTerm = req.query.searchTerm || "";
      const searchFilter = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } }
        ]
      };

      // Filter by status, priority, and userId
      const status = req.query.status ? req.query.status : { $in: ["pending", "in_progress", "completed"] };
      const priority = req.query.priority ? req.query.priority : { $in: ["low", "medium", "high"] };
      const userId = req.query.userId ? req.query.userId : { $exists: true };

      // Date filtering
      let dueDateFilter = {};
      if (req.query.dueDateBefore) {
        dueDateFilter["$lte"] = new Date(req.query.dueDateBefore);
      }
      if (req.query.dueDateAfter) {
        dueDateFilter["$gte"] = new Date(req.query.dueDateAfter);
      }

      const sort = req.query.sort || "createdAt";
      const order = req.query.order === "asc" ? 1 : -1;

      const tasks = await Tasks.find({
        ...searchFilter,
        status,
        priority,
        userId,
        ...(Object.keys(dueDateFilter).length ? { dueDate: dueDateFilter } : {})
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
        if(tasks.length<1){
          return res.status(200).json({tasks,message:'no tasks found....'});

        }

      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };
