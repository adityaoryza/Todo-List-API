const db = require("../db/database");

//============================================================ note activities group

// note get all activities
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
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      ],
    };

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: result[0].data,
    });
  });
};

// note get One activities
exports.getOne = (req, res) => {
  const activityId = req.params.activity_id;
  const q = `SELECT * FROM activities WHERE activity_id=${activityId}`;

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
        message: `Activity with ID ${activityId} Not Found`,
      });
    }

    const data = result[0];
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {
        id: data.activity_id,
        title: data.title,
        email: data.email,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  });
};

//note create new activities
exports.createNew = (req, res) => {
  const { title, email } = req.body;
  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
    });
  }
  if (!email) {
    return res.status(400).json({
      status: "Bad Request",
      message: "email cannot be null",
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

//note  update activities
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
    if (title === "" || email === "") {
      return res.status(400).json({
        status: "Bad Request",
        message: "Title and email cannot be blank",
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
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {
          id: data.activity_id,
          title: data.title,
          email: data.email,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      });
    });
  });
};

//note Delete activities
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

// =====================================================note todos group

//note get all todos item
exports.getAllTodoItems = (req, res) => {
  const { activity_group_id } = req.query;
  let q = `SELECT * FROM todos`;

  // If activity_group_id query param is present and not empty
  if (activity_group_id && activity_group_id.trim()) {
    q += ` WHERE activity_group_id = ?`;
    db.query(q, [activity_group_id], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Error",
          message: "Unable to fetch data from database",
        });
      }

      if (!result.length) {
        const data = [];
        return res.status(200).json({
          status: "Success",
          message: "No data found",
          data,
        });
      }

      const data = result.map((item) => ({
        id: item.todo_id,
        activity_group_id: item.activity_group_id,
        title: item.title,
        is_active: Boolean(item.is_active),
        priority: item.priority,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    });
  } else {
    // If activity_group_id query param is missing or empty
    db.query(q, (error, result) => {
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

      const data = result.map((item) => ({
        id: item.todo_id,
        activity_group_id: item.activity_group_id,
        title: item.title,
        is_active: Boolean(item.is_active),
        priority: item.priority,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    });
  }
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
        status: "Not Found",
        message: `Todo with ID ${req.params.todo_id} Not Found`,
      });
    }

    const data = result[0];

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {
        id: data.todo_id,
        activity_group_id: data.activity_group_id,
        title: data.title,
        priority: data.priority,
        is_active: Boolean(data.is_active),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  });
};

//note  create new Todo Item
exports.createNewTodoItem = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;
  const priority = req.body.priority || "very-high"; // default priority is medium

  // check if required fields are present
  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
    });
  }
  if (activity_group_id == undefined) {
    return res.status(400).json({
      status: "Bad Request",
      message: "activity_group_id cannot be null",
    });
  }

  // set default value for is_active if not specified in request
  const isActive = is_active !== undefined ? is_active : true;

  // create SQL query to insert new todo item into database
  const q = `INSERT INTO todos (title, activity_group_id, is_active, priority) VALUES (?, ?, ?, ?)`;
  db.query(
    q,
    [title, activity_group_id, isActive, priority],
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
        message: "Success",
        data: {
          id: result.insertId,
          title,
          activity_group_id,
          is_active: isActive,
          priority,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
    }
  );
};

// note update todos item
exports.updateTodoItem = (req, res) => {
  const { activity_group_id, title, is_active, priority } = req.body;
  let sets = [];
  if (activity_group_id !== undefined)
    sets.push(`activity_group_id = ${db.escape(activity_group_id)}`);
  if (title) sets.push(`title = ${db.escape(title)}`);
  if (is_active !== undefined) sets.push(`is_active = ${is_active}`);
  if (priority) sets.push(`priority = ${db.escape(priority)}`);
  let setClause = sets.join(", ");
  let q = `UPDATE todos SET ${setClause} WHERE todo_id=${req.params.todo_id};`;
  db.query(q, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Unable to update todo item",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${req.params.todo_id} Not Found`,
      });
    }

    let getUpdatedTodoQuery = `SELECT * FROM todos WHERE todo_id=${req.params.todo_id}`;
    db.query(getUpdatedTodoQuery, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Error",
          message: "Unable to fetch updated data from database",
        });
      }

      const data = result[0];
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: {
          id: data.todo_id,
          activity_group_id: data.activity_group_id,
          title: data.title,
          is_active: data.is_active,
          priority: data.priority,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      });
    });
  });
};

// note delete todos item
exports.deleteTodoItem = (req, res) => {
  const todoId = req.params.todo_id;

  const q = "DELETE FROM todos WHERE todo_id = ?";
  const params = [todoId];

  db.query(q, params, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }

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
