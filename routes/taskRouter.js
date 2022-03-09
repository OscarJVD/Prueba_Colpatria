const router = require('express').Router()
const auth = require("../middleware/auth"); // Middleware
const taskCtrl = require('../controllers/taskCtrl')

router.get('/', auth, taskCtrl.get) // el usuario ve sus tareas
router.post('/', auth, taskCtrl.add)
router.put('/:id', auth, taskCtrl.edit)
router.delete('/:id', auth, taskCtrl.delete) // se conoce de softdelete pero en el requerimiento se especifica como eliminar, no como softdelete

module.exports = router;