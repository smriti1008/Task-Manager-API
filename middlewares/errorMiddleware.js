function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map(
        (item) => item.message
      ),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID or data format",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "A record with this value already exists",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
}

export default errorMiddleware;