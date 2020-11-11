const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save(function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });

    const token = jwt.sign(
      { userId: user._id },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjFhZTk5MDU1NGI1MzJjOTBjMGIzNzIiLCJpYXQiOjE1OTU1OTkyNDl9.6IzLUWfDlAmoJQLARlXP2tOOOQaH-ZEcF32HtlFnep8"
    );
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(422).send("Must provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send("Email not found!");
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign(
      { userId: user._id },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjFhZTk5MDU1NGI1MzJjOTBjMGIzNzIiLCJpYXQiOjE1OTU1OTkyNDl9.6IzLUWfDlAmoJQLARlXP2tOOOQaH-ZEcF32HtlFnep8"
    );
    res.send("Logged on");
    console.log(token);
  } catch (err) {
    return res.status(422).send("Invalid password or email");
  }
});

module.exports = router;
