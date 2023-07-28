const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../middleware/cacheMiddleware');

const {
  getAll,
  getOne,
  createNew,
  update,
  deleteData,
  getAllTodoItems,
  getOneTodoItem,
  createNewTodoItem,
  updateTodoItem,
  deleteTodoItem,
  welcome,
} = require('../controller/todoController');

router.get('/', welcome);

// note activity-groups
router.get('/activity-groups', cacheMiddleware(3 * 60), getAll);
router.get('/activity-groups/:activity_id', cacheMiddleware(3 * 60), getOne);
router.post('/activity-groups', createNew);
router.patch('/activity-groups/:activity_id', update);
router.delete('/activity-groups/:activity_id', deleteData);

//note todo group
router.get('/todo-items', cacheMiddleware(3 * 60), getAllTodoItems);
router.get('/todo-items/:todo_id', cacheMiddleware(3 * 60), getOneTodoItem);
router.post('/todo-items', createNewTodoItem);
router.patch('/todo-items/:todo_id', updateTodoItem);
router.delete('/todo-items/:todo_id', deleteTodoItem);

module.exports = router;
