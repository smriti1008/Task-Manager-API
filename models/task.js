import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        default: "",
    },
    status:{
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
    },
    dueDate:{
        type: Date,
        default: null,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
},
{timestamps: true}
)
const Task = mongoose.model("Task", taskSchema);

export default Task;
