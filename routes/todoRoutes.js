const express = require("express");
const router = express.Router();
const {
  createDB,
  createTable,
  getAll,
  getOne,
  createNew,
  update,
  deleteData,
} = require("../controller/todoController");

// note activity-groups

// get All
router.get("/activity-groups", getAll);
// get One
router.get("/activity-groups/:id", getOne);
// create New
router.post("/activity-groups", createNew);
// update
router.patch("/activity-groups/:id", update);
// delete
router.delete("/activity-groups/:id", deleteData);

// todo group
// get All
router.get("/activity-groups", getAll);
module.exports = router;
