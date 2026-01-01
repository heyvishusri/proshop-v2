import mongoose from "mongoose";

const checkObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    const error = new Error(`Resource not found`);
    next(error);
    return;
  }
  next();
};

export default checkObjectId;

