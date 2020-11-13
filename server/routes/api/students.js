const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterStudent = require("../../validation/register");
const validateLoginStudent = require("../../validation/login");
// Load Student model
const Student = require("../../models/Student");

secretOrKey = "secret";

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log("register");
  // Form validation
  const { errors, isValid } = validateRegisterStudent(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Student.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newStudent = new Student({
        name: req.body.name,
        usn: req.body.usn,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
          if (err) throw err;
          newStudent.password = hash;
          newStudent
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginStudent(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const usn = req.body.usn;
  const password = req.body.password;
  // Find user by email
  Student.findOne({ usn }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usnnotfound: "USN not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Student matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          usn: user.usn,
        };
        // Sign token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
