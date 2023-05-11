const db = require("../db/database");

// note activities group

// get all activities
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

// note get One activities
exports.getOne = (req, res) => {
  let q = `SELECT * FROM activities WHERE activity_id=${req.params.activity_id}`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.activity_id} Not Found`,
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

    return res.status(200).json(result);
  });
};

// create new activities
exports.createNew = (req, res) => {
  const { title, email } = req.body;
  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
    });
  }
  let q = `INSERT INTO activities SET ? `;
  db.query(q, { title, email }, (error, result) => {
    if (error) throw error;
    const data = {
      id: result.insertId,
      title,
      email,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    return res.status(201).json({
      status: "Success",
      message: "Success",
      data,
    });
  });
};

// update activities
exports.update = (req, res) => {
  const { title, email } = req.body;
  let q = `UPDATE activities SET `;
  let updates = [];
  if (title) updates.push(`title = '${title}'`);
  if (email) updates.push(`email = '${email}'`);
  q += updates.join(", ") + ` WHERE activity_id = ${req.params.activity_id};`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to update data in database",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.activity_id} Not Found`,
      });
    }

    let getUpdatedDataQuery = `SELECT * FROM activities WHERE activity_id=${req.params.activity_id}`;
    db.query(getUpdatedDataQuery, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Error",
          message: "Unable to fetch updated data from database",
        });
      }

      const data = result[0];
      result[0] = {
        status: "Success",
        message: "Success",
        data: {
          id: data.activity_id,
          title: data.title,
          email: data.email,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      };

      return res.status(200).json(result);
    });
  });
};

//Delete activities
exports.deleteData = (req, res) => {
  let q = `DELETE FROM activities where activity_id=${req.params.activity_id};`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Something went wrong",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.activity_id} Not Found`,
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {},
    });
  });
};

// note todos group

// get all todos item
exports.getAllTodoItems = (req, res) => {
  const { activity_group_id } = req.query;
  let q = `SELECT * FROM todos WHERE activity_group_id = ?;`;
  db.query(q, [activity_group_id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        status: "Error",
        message: "Requested data not found",
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

// note get One todo Items
exports.getOneTodoItem = (req, res) => {
  let q = `SELECT * FROM todos WHERE todo_id =${req.params.todo_id};`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to fetch data from database",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Todo item not found",
      });
    }

    const data = result[0];

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {
        id: data.todo_id,
        activityGroupId: data.activity_group_id,
        title: data.title,
        priority: data.priority,
        isActive: Boolean(data.is_active),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  });
};

//note  create new Todo Item
exports.createNewTodoItems = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;
  const priority = req.body.priority || "very High"; // default priority is medium

  // check if required fields are present
  if (!title || !activity_group_id || is_active == undefined) {
    return res.status(400).json({
      status: "Error",
      message: "Missing required fields",
    });
  }

  // create SQL query to insert new todo item into database
  const q = `INSERT INTO todos (title, activity_group_id, is_active, priority) VALUES (?, ?, ?, ?)`;
  db.query(
    q,
    [title, activity_group_id, is_active, priority],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Error",
          message: "Unable to create new todo item",
        });
      }

      return res.status(201).json({
        status: "Success",
        message: "Todo item created successfully",
        data: {
          id: result.insertId,
          title,
          activity_group_id,
          is_active,
          priority,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
  );
};

// note update todos item
exports.updateTodoItem = (req, res) => {
  const { activity_group_id, title, is_active, priority } = req.body;
  let sets = [];
  if (activity_group_id)
    sets.push(`activity_group_id = ${db.escape(activity_group_id)}`);
  if (title) sets.push(`title = ${db.escape(title)}`);
  if (is_active !== undefined) sets.push(`is_active = ${is_active}`);
  if (priority) sets.push(`priority = ${db.escape(priority)}`);
  let setClause = sets.join(", ");
  let q = `UPDATE todos SET ${setClause} WHERE todo_id=${req.params.todo_id};`;
  db.query(q, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Update data successfully");
  });
};

// delete todos item
exports.deleteTodoItem = (req, res) => {
  const todoId = req.params.todo_id;

  let q = `DELETE FROM todos WHERE todo_id = ${todoId}`;
  db.query(q, (error, result) => {
    if (error) throw error;

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${todoId} Not Found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {},
    });
  });
};
