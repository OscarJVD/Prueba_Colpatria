const router = require('express').Router()
const auth = require("../middleware/auth"); // Middleware
const taskCtrl = require('../controllers/taskCtrl')

router.get('/gettasks', auth, taskCtrl.gettasks) // el usuario ve sus tareas
// router.get('/gettask', auth, taskCtrl.gettask)
router.post('/addtask', auth, taskCtrl.addtask)
router.put('/edittask', auth, taskCtrl.edittask)
router.delete('/deletetask', auth, taskCtrl.deletetask) // se conoce de softdelete pero en el requerimiento se especifica como eliminar, no como softdelete

module.exports = router;