const router = require("express").Router();
const Assignment = require("../db").import("../models/assignment");

//POST: create new assignment (for instructors)
router.post("/new", (req, res) =>
  Assignment.create({
    title: req.body.assignment.title,
    instructions: req.body.assignment.instructions,
    user: req.user.id
  })
    .then(assignment => res.json({ assignment: assignment }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: find all assignments for an instructor (for students)
router.get("/:user", (req, res) => {
  if (!req.errors) {
    Assignment.findAll({
      where: { user: req.params.user }
    })
      .then(data => res.json(data))
      .catch(err => res.status(500).json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

//GET: find single assignments from an instructor (for students)
router.get("/item/:assignmentId", (req, res) => {
  if (!req.errors) {
    Assignment.findOne({
      where: { id: req.params.assignmentId }
    })
      .then(data => res.json(data))
      .catch(err => res.status(500).json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

//GET: list all assignments for self (for instructors)
router.get("/", (req, res) =>
  Assignment.findAll({ where: { user: req.user.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update individual assignments (for instructors)
router.put("/:id", (req, res) =>
  Assignment.update(req.body.assignment, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE individual assignment (for instructors)
router.delete("/:id", (req, res) =>
  Assignment.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
