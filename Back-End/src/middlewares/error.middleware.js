const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON body" });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .json({ success: false, message: "Email already registered" });
  }

  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong" });
};

export default errorHandler;
