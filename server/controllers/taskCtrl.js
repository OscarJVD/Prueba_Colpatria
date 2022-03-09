const Tasks = require("../models/taskModel");

const taskCtrl = {
  get: async (req, res) => {
    try {
      const tasks = await Tasks.find({ user: req.authUserId });
      res.json({ tasks });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  add: async (req, res) => {
    try {
      const { title, desc } = req.body;
      const task = new Tasks({ title, desc, user: req.authUser.id });
      await task.save();
      res.json({ msg: 'Tarea Guardada' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  edit: async (req, res) => {
    try {
      const { title, desc, status } = req.body;
      const newTask = { title, desc, status };
      await Tasks.findByIdAndUpdate(req.params.id, newTask);
      res.json({ msg: 'Tarea Editada' });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Tasks.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Tarea Eliminada' });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = taskCtrl;
