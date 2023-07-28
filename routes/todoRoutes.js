const express = require('express');
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
router.get('/activity-groups', getAll);
router.get('/activity-groups/:activity_id', getOne);
router.post('/activity-groups', createNew);
router.patch('/activity-groups/:activity_id', update);
router.delete('/activity-groups/:activity_id', deleteData);

//note todo group
router.get('/todo-items', getAllTodoItems);
router.get('/todo-items/:todo_id', getOneTodoItem);
router.post('/todo-items', createNewTodoItem);
router.patch('/todo-items/:todo_id', updateTodoItem);
router.delete('/todo-items/:todo_id', deleteTodoItem);

module.exports = router;
