const express = require("express");
const router = express.Router();

// Model User
const Users = require("../models/Users");

// @route GET /users/test
router.get("/test", (req, res) => res.send("Users route testing!"));

// @route GET /users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No Users found" }));
});

// @route POST /users/connect
router.post("/login", (req, res) => {
  // Check if the user exists
  Users.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      if (!user) {
        //if the user with this combination email/password does not exist in the database we return an error
        return res.status(404).json({ usernotfound: "User not found" });
      }
      // else we return the user and make the connection
      return res.status(200).json(user);
    })
    .catch((err) => console.log(err));
});

// @route POST /signup
router.post("/signup", (req, res) => {
  // Check if the user exists
  Users.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // We are checking if the user exists in the database
      if (user) {
        return res.status(404).json({ userexists: "User already exists" });
      }
      // Create a new user
      const newUser = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route POST /users to delete a user
router.post("/delete", (req, res) => {
  Users.findOneAndDelete({ _id: req.body._id })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nomaterialfound: "No user found" }));
});

// @route PUT /users to update a user
router.put("/:id", (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nomaterialfound: "No user found" }));
});

// @route POST /users to add a user
router.post("/create", (req, res) => {
  Users.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
