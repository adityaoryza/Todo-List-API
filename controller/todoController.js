const db = require("../db/database");

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
          id: data.id,
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
  let q = `select * from activities where id=${req.params.id}`;
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
          id: data.id,
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
  let q = `UPDATE activities SET ? where id=${req.params.id};`;
  db.query(q, { title, email }, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Update data successfully");
  });
};
//Delete instance
exports.deleteData = (req, res) => {
  let q = `DELETE FROM activities where id=${req.params.id};`;
  db.query(q, (error, result) => {
    if (error) throw error;
    return res.status(201).json("Delete data successfully");
  });
};
