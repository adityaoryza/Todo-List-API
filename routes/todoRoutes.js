const express = require("express");
// note caching using express-api-cache
var cacheService = require("express-api-cache");
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
} = require("../controller/todoController");

// note activity-groups

// get All
router.get("/activity-groups", cache("5 minutes"), getAll);
// get One
router.get("/activity-groups/:activity_id", cache("5 minutes"), getOne);
// create New
router.post("/activity-groups", cache("5 minutes"), createNew);
// update
router.patch("/activity-groups/:activity_id", cache("5 minutes"), update);
// delete
router.delete("/activity-groups/:activity_id", deleteData);

//note todo group

// get All
router.get("/todo-items", cache("5 minutes"), getAllTodoItems);
// // get One
router.get("/todo-items/:todo_id", cache("5 minutes"), getOneTodoItem);
// // create New
router.post("/todo-items", cache("5 minutes"), createNewTodoItem);
// // update
router.patch("/todo-items/:todo_id", cache("5 minutes"), updateTodoItem);
// // delete
router.delete("/todo-items/:todo_id", deleteTodoItem);

module.exports = router;
