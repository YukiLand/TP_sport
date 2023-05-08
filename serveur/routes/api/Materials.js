const express = require("express");
const router = express.Router();

// Model Material
const Materials = require("../models/Materials");

// @route GET /materials/test
router.get("/test", (req, res) => res.send("Materials route testing!"));

// @route GET /materials
router.get("/", (req, res) => {
  Materials.find()
    .then((materials) => res.json(materials))
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No Materials found" })
    );
});

// @route GET /materials/:id
router.get("/:id", (req, res) => {
  Materials.findById(req.params.id)
    .then((material) => res.json(material))
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No material found" })
    );
});

// @route GET all sports available
router.get("/sports/list", (req, res) => {
  Materials.find()
    .then((materials) => {
      //for each material, get the sport and if sport is not already in the array we add it
      const sports = materials.map((material) => material.sport);
      const uniqueSports = [...new Set(sports)];
      res.json(uniqueSports);
    })
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No Sports found" })
    );
});

// @route POST get all materials for a sport
router.post("/search", (req, res) => {
  Materials.find({ sport: req.body.sport })
    .then((materials) => res.json(materials))
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No Materials found" })
    );
});

// @route POST /materials to delete a material
router.post("/delete", (req, res) => {
  Materials.findOneAndDelete({ _id: req.body._id })
    .then((material) => res.json(material))
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No material found" })
    );
});

// @route PUT /materials to update a material
router.put("/:id", (req, res) => {
  Materials.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true }
  )
    .then((material) => res.json(material))
    .catch((err) =>
      res.status(404).json({ nomaterialfound: "No material found" })
    );
});

// @route POST /materials to add a material
router.post("/create", (req, res) => {
  Materials.create(req.body)
    .then((material) => res.json(material))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
