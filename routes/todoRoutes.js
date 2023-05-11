const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  createNew,
  update,
  deleteData,
  getTodoAll,
  getTodoOne,
  createTodoNew,
  updateTodo,
  deleteTodoData,
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
router.get("/activity-groups", getTodoAll);
// get One
router.get("/activity-groups/:activity_id", getTodoOne);
// create New
router.post("/activity-groups", createTodoNew);
// update
router.patch("/activity-groups/:activity_id", updateTodo);
// delete
router.delete("/activity-groups/:activity_id", deleteTodoData);

module.exports = router;
