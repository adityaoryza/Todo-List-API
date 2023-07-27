const express = require('express');
// note caching using express-api-cache
var cacheService = require('express-api-cache');
var cache = cacheService.cache;
const router = express.Router();
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
} = require('../controller/todoController');

// note activity-groups
router.get('/activity-groups', cache('5 minutes'), getAll);
router.get('/activity-groups/:activity_id', cache('5 minutes'), getOne);
router.post('/activity-groups', cache('5 minutes'), createNew);
router.patch('/activity-groups/:activity_id', cache('5 minutes'), update);
router.delete('/activity-groups/:activity_id', deleteData);

//note todo group
router.get('/todo-items', cache('5 minutes'), getAllTodoItems);
router.get('/todo-items/:todo_id', cache('5 minutes'), getOneTodoItem);
router.post('/todo-items', cache('5 minutes'), createNewTodoItem);
router.patch('/todo-items/:todo_id', cache('5 minutes'), updateTodoItem);
router.delete('/todo-items/:todo_id', deleteTodoItem);

module.exports = router;
