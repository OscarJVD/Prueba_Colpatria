const auth = require("../middleware/auth");
const Tasks = require("../models/taskModel");

const taskCtrl = {
  gettasks: async (req, res) => {
    try {
      const authUser = await auth(req, res);
      if (!authUser) return res.status('400').json({ err: 'Inicia sesión para continuar.' });

      const tasks = await Tasks.find({ user: authUser.id });

      res.json({ tasks });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addtask: async (req, res) => {
    try {
      const authUser = await auth(req, res);
      if (!authUser) return res.status('400').json({ err: 'Inicia sesión para continuar.' });

      const { title, description } = req.body;
      const task = new Tasks({ title, description, user: authUser.id });
      await task.save();
      res.json({ msg: 'Tarea Guardada' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  edittask: async (req, res) => {
    try {
      const authUser = await auth(req, res);
      if (!authUser) return res.status('400').json({ err: 'Inicia sesión para continuar.' });

      const { title, description } = req.body;
      const newTask = { title, description };
      await Tasks.findByIdAndUpdate(req.params.id, newTask);
      res.json({ msg: 'Tarea Editada' });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletetask: async (req, res) => {
    try {
      const authUser = await auth(req, res);
      if (!authUser) return res.status('400').json({ err: 'Inicia sesión para continuar.' });

      await Tasks.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Tarea Eliminada' });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = taskCtrl;
