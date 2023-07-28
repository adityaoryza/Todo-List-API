const db = require('../models/db');
const { queryAsync } = require('../models/dbUtils');

exports.welcome = async (req, res, next) => {
  return res.json({
    message: 'Welcome to this API',
  });
};

// note get all activities
exports.getAll = async (req, res, next) => {
  try {
    const q = 'SELECT activity_id, title, email, created_at FROM activities';
    const result = await queryAsync(q);

    const data = result.map((row) => ({
      id: row.activity_id,
      title: row.title,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// note get One activities
exports.getOne = async (req, res, next) => {
  try {
    const activityId = req.params.activity_id;
    const q = `SELECT activity_id, title, email, created_at FROM activities WHERE activity_id = ?`;
    const result = await queryAsync(q, [activityId]);

    if (result.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      });
    }

    const data = result[0];
    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {
        id: data.activity_id,
        title: data.title,
        email: data.email,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

//note create new activities
exports.createNew = async (req, res, next) => {
  try {
    const { title, email } = req.body;
    if (!title) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'title cannot be null',
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email cannot be null',
      });
    }

    const createdAt = new Date();
    const q = `INSERT INTO activities (title, email, created_at) VALUES (?, ?, ?)`;
    const result = await queryAsync(q, [title, email, createdAt]);

    const data = {
      id: result.insertId,
      title,
      email,
      updatedAt: createdAt,
      createdAt,
    };

    return res.status(201).json({
      status: 'Success',
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

//note  update activities
// need to be improved
exports.update = async (req, res, next) => {
  try {
    const { title, email } = req.body;
    if (title === '' || email === '') {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Title and email cannot be blank',
      });
    }

    let updates = [];
    let values = [];

    if (title) {
      updates.push('title = ?');
      values.push(title);
    }
    if (email) {
      updates.push('email = ?');
      values.push(email);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'No valid fields to update',
      });
    }

    values.push(req.params.activity_id);

    const q = `UPDATE activities SET ${updates.join(
      ', '
    )} WHERE activity_id = ?`;
    const result = await queryAsync(q, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${req.params.activity_id} Not Found`,
      });
    }

    const getUpdatedDataQuery =
      'SELECT activity_id, title, email, created_at, updated_at FROM activities WHERE activity_id = ?';
    const updatedResult = await queryAsync(getUpdatedDataQuery, [
      req.params.activity_id,
    ]);

    const data = updatedResult[0];
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {
        id: data.activity_id,
        title: data.title,
        email: data.email,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

//note Delete activities
exports.deleteData = async (req, res, next) => {
  try {
    const activityId = req.params.activity_id;
    const q = `DELETE FROM activities WHERE activity_id = ?`;
    const result = await queryAsync(q, [activityId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

//note get all todos item
exports.getAllTodoItems = async (req, res, next) => {
  try {
    const { activity_group_id } = req.query;
    const q = `
      SELECT 
        todo_id, 
        activity_group_id, 
        title, 
        is_active, 
        priority, 
        created_at, 
        updated_at 
      FROM todos 
      WHERE activity_group_id = ?`;

    let result;
    if (activity_group_id && activity_group_id.trim()) {
      result = await queryAsync(q, [activity_group_id]);
    } else {
      result = await queryAsync(
        'SELECT todo_id, activity_group_id, title, is_active, priority, created_at, updated_at FROM todos'
      );
    }

    if (!result.length) {
      return res.status(200).json({
        status: 'Success',
        message: 'No data found',
        data: [],
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
      status: 'Success',
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// note get One todo Items
exports.getOneTodoItem = async (req, res, next) => {
  try {
    const q = `
      SELECT 
        todo_id, 
        activity_group_id, 
        title, 
        priority, 
        is_active, 
        created_at, 
        updated_at 
      FROM todos 
      WHERE todo_id = ?`;

    const result = await queryAsync(q, [req.params.todo_id]);

    if (result.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.todo_id} Not Found`,
      });
    }

    const data = result[0];

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
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
  } catch (error) {
    next(error);
  }
};

//note  create new Todo Item
exports.createNewTodoItem = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;
  const priority = req.body.priority || 'very-high'; // default priority is medium

  // check if required fields are present
  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
    });
  }
  if (activity_group_id == undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
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
          status: 'Error',
          message: 'Unable to create new todo item',
        });
      }

      return res.status(201).json({
        status: 'Success',
        message: 'Success',
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
// need to be improved
exports.updateTodoItem = async (req, res) => {
  try {
    const { activity_group_id, title, is_active, priority } = req.body;

    let sets = [];
    let values = [];

    if (activity_group_id !== undefined) {
      sets.push('activity_group_id = ?');
      values.push(activity_group_id);
    }
    if (title) {
      sets.push('title = ?');
      values.push(title);
    }
    if (is_active !== undefined) {
      sets.push('is_active = ?');
      values.push(is_active);
    }
    if (priority) {
      sets.push('priority = ?');
      values.push(priority);
    }

    if (sets.length === 0) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'No valid fields to update',
      });
    }

    values.push(req.params.todo_id);

    const setClause = sets.join(', ');
    const q = `UPDATE todos SET ${setClause} WHERE todo_id = ?`;
    await queryAsync(q, values);

    const getUpdatedTodoQuery = `
      SELECT 
        todo_id, 
        activity_group_id, 
        title, 
        priority, 
        is_active, 
        created_at,
        updated_at 
      FROM todos 
      WHERE todo_id = ?`;

    const result = await queryAsync(getUpdatedTodoQuery, [req.params.todo_id]);

    if (result.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.todo_id} Not Found`,
      });
    }

    const data = result[0];
    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {
        id: data.todo_id,
        activity_group_id: data.activity_group_id,
        title: data.title,
        is_active: Boolean(data.is_active),
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Error',
      message: 'Unable to update todo item',
    });
  }
};

// note delete todos item
exports.deleteTodoItem = async (req, res) => {
  try {
    const todoId = req.params.todo_id;

    const q = 'DELETE FROM todos WHERE todo_id = ?';
    const result = await queryAsync(q, [todoId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${todoId} Not Found`,
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
    });
  }
};
