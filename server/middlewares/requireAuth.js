const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("You must be logged in.");
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(
    token,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjFhZTk5MDU1NGI1MzJjOTBjMGIzNzIiLCJpYXQiOjE1OTU1OTkyNDl9.6IzLUWfDlAmoJQLARlXP2tOOOQaH-ZEcF32HtlFnep8",
    async (err, payload) => {
      if (err) {
        return res.status(401).send("You must be logged in.");
      }

      const { userId } = payload;

      const user = await User.findById(userId);

      req.user = user;
      next();
    }
  );
};
