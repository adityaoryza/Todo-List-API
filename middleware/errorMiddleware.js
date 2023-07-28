exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};
