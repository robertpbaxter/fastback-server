const router = require("express").Router();
const Submission = require("../db").import("../models/submission");

//POST: create new submission
router.post("/", (req, res) =>
  Submission.create({
    studentId: req.user.id,
    instructorId: req.body.submission.instructorId,
    assignmentId: req.body.submission.assignmentId,
    content: req.body.submission.content,
    grade: req.body.submission.grade
  })
    .then(submission => res.json({ submission: submission }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: list all submissions from a specific assignment (for instructors)
router.get("/", (req, res) =>
  Submission.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//GET: list all submissions from a specific assignment (for instructors)
router.get("/grading/:assignmentId", (req, res) =>
  Submission.findAll({
    where: { instructorId: req.user.id, assignmentId: req.params.assignmentId }
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: call single submission
router.get("/item/:submissionId", (req, res) =>
  Submission.findOne({ where: { id: req.params.submissionId } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: call single assignment
router.get("/:instructorId/:assignmentId", (req, res) =>
  Submission.findOne({
    where: {
      studentId: req.user.id,
      instructorId: req.params.instructorId,
      assignmentId: req.params.assignmentId
    }
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update submission
router.put("/:id", (req, res) =>
  Submission.update(req.body.submission, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE: delete a submission
router.delete("/:id", (req, res) =>
  Submission.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
