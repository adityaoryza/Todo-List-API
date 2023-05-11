const db = require("../db/database");

// note activities group
// note get ALl
exports.getAll = (req, res) => {
  let q = "select * from activities;";
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    const data = result[0];
    result[0] = {
      status: "Success",
      message: "Success",
      data: [
        {
          id: data.activity_id,
          title: data.title,
          email: data.email,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      ],
    };

    return res.status(201).json(result);
  });
};

// note get One
exports.getOne = (req, res) => {
  let q = `select * from activities where activity_id=${req.params.activity_id}`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    const data = result[0];
    result[0] = {
      status: "Success",
      message: "Success",
      data: [
        {
          id: data.activity_id,
          title: data.title,
          email: data.email,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      ],
    };

    return res.status(201).json(result);
  });
};
// create new instance
exports.createNew = (req, res) => {
  let q = `INSERT INTO activities SET ? `;
  const { title, email } = req.body;
  db.query(q, { title, email }, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Insert new data successfully");
  });
};
//Update instance
exports.update = (req, res) => {
  const { title, email } = req.body;
  let q = `UPDATE activities SET ? where activity_id=${req.params.activity_id};`;
  db.query(q, { title, email }, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Update data successfully");
  });
};
//Delete instance
exports.deleteData = (req, res) => {
  let q = `DELETE FROM activities where activity_id=${req.params.activity_id};`;
  db.query(q, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Delete data successfully");
  });
};

// todos group
// get all todos
exports.getTodoAll = (req, res) => {
  let q = "SELECT * FROM todos;";
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    const data = result[0];
    result[0] = {
      status: "Success",
      message: "Success",
      data: [
        {
          id: data.todo_id,
          activityGroupId: data.activity_group_id,
          title: data.title,
          priority: data.priority,
          isActive: Boolean(data.is_active),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      ],
    };

    return res.status(201).json(result);
  });
};

// get one todo
exports.getTodoOne = (req, res) => {
  let q = ` SELECT * FROM todos WHERE todo_id=${req.params.todo_id}`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    const data = result[0];
    result[0] = {
      status: "Success",
      message: "Success",
      data: [
        {
          id: data.todo_id,
          activityGroupId: data.activity_group_id,
          title: data.title,
          priority: data.priority,
          isActive: Boolean(data.is_active),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      ],
    };

    return res.status(201).json(result);
  });
};

// create new todo
exports.createTodoNew = (req, res) => {
  let q = "INSERT INTO todos SET ? ";
  const { activityGroupId, title, priority, isActive } = req.body;
  db.query(
    q,
    {
      activity_group_id: activityGroupId,
      title,
      priority,
      is_active: Number(isActive),
    },
    (error, result) => {
      if (error) throw error;
      return res.status(201).json("Insert new data successfully");
    }
  );
};

// update todo
exports.updateTodo = (req, res) => {
  const { activityGroupId, title, priority, isActive } = req.body;
  let q = `UPDATE todos SET ? WHERE todo_id=${req.params.todo_id}`;
  db.query(
    q,
    {
      activity_group_id: activityGroupId,
      title,
      priority,
      is_active: Number(isActive),
    },
    (error, result) => {
      if (error) throw error;
      return res.status(201).json("Update data successfully");
    }
  );
};

// delete todo
exports.deleteTodoData = (req, res) => {
  let q = ` DELETE FROM todos WHERE todo_id=${req.params.todo_id}`;
  db.query(q, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Delete data successfully");
  });
};
