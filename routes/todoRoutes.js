const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
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

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

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
