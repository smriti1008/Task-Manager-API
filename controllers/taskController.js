// A user should be able to:
// 1. Create a task.                CREATE TASKS
// 2. See all their tasks.          GET TASKS
// 3. Open an individual task.      GET TASK
// 4. Edit a task.                  UPDATE TASK
// 5. Delete a task.                DELETE TASK
// 6. Filter tasks based on their status.

import Task from '../models/task.js'

// GET api//tasks

export const getTasks = async(req, res, next)=>{
    try{
        const filter = {user: req.user.id};

        if(req.query.status){
            const allowedStatuses = [
                "pending",
                "in-progress",
                "completed",
            ];
            if(!allowedStatuses.includes(req.query.status)){
                return res.status(400).json({
                    message: "Invalid task status",
                })
            }

            filter.status = req.query.status;
        }
        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            count: tasks.length,
            tasks
        });
    } 
    catch(error){
        next(error);
    }
}


export const createTask = async (req, res, next)=>{
    try{
        const {title, description, dueDate} = req.body;

        if(typeof title !== "string" || !title.trim()){
            return res.status(400).json({
                message: "Task title is required",
            })
        }
        const taskData = {
            title: title.trim(),
            user: req.user.id,
        };
        if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Description must be a string",
        });
      }

      taskData.description = description;
    }

    if (dueDate !== undefined && dueDate !== null && dueDate !== "") {
      const parsedDate = new Date(dueDate);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          message: "Invalid due date",
        });
      }

      taskData.dueDate = parsedDate;
    }

    const task = await Task.create(taskData);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Title must be a non-empty string",
        });
      }

      updates.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Description must be a string",
        });
      }

      updates.description = description;
    }

    if (status !== undefined) {
      if (
        !["pending", "in-progress", "completed"].includes(status)
      ) {
        return res.status(400).json({
          message: "Invalid task status",
        });
      }

      updates.status = status;
    }

    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === "") {
        updates.dueDate = null;
      } else {
        const parsedDate = new Date(dueDate);

        if (Number.isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            message: "Invalid due date",
          });
        }

        updates.dueDate = parsedDate;
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide at least one valid field to update",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({   //Searches for a document matching the 
//         given conditions.
//         Deletes that document from MongoDB.
//         Returns the deleted document.
      _id: req.params.id,  //This tells MongoDB which task to delete.
      user: req.user.id,   //This ensures that the task belongs to the logged-in user.      
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

