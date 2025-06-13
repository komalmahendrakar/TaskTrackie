const task = require("../models/tasks");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status} = req.body;
    const { user } = req;
    
    if (!title || !description) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // Create a new task
    const newTask = new task({
      title,
      description,
      priority, 
      status    
    });

    await newTask.save();

    // Add new task to user's task list
    user.tasks.push(newTask._id);
    await user.save();

    return res.status(200).json({ success: "Task added!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // Find and update task by ID
    const updatedTask = await task.findByIdAndUpdate(
      id,
      { title, description, priority, status },
      { new: true } // Ensure you get the updated task object
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ success: "Task updated!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete task by ID
    const deletedTask = await task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ success: "Task deleted!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskdetails = await task.findById(id);

    if (!taskdetails) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ taskdetails });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getTask, editTask, addTask, deleteTask };
