const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Multer errors
  if (err.name === 'MulterError') {
    const message = `File upload error: ${err.message}`;
    error = { message, statusCode: 400 };
  }

  // Custom file validation errors
  if (err.message && err.message.includes('Only image files')) {
    error = { message: err.message, statusCode: 400 };
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  console.error('Error:', err);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
