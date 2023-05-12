const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  createNew,
  update,
  deleteData,
  getAllTodoItems,
  getOneTodoItem,
  createNewTodoItems,
  updateTodoItem,
  deleteTodoItem,
} = require("../controller/todoController");

// note activity-groups

// get All
router.get("/activity-groups", getAll);
// get One
router.get("/activity-groups/:activity_id", getOne);
// create New
router.post("/activity-groups", createNew);
// update
router.patch("/activity-groups/:activity_id", update);
// delete
router.delete("/activity-groups/:activity_id", deleteData);

//note todo group

// get All
router.get("/todo-items", getAllTodoItems);
// // get One
router.get("/todo-items/:todo_id", getOneTodoItem);
// // create New
router.post("/todo-items", createNewTodoItems);
// // update
router.patch("/todo-items/:todo_id", updateTodoItem);
// // delete
router.delete("/todo-items/:todo_id", deleteTodoItem);

module.exports = router;
