const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

//POST: create a user
router.post("/signup", (req, res) => {
  User.create({
    //left side of the body has to match the model
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    permission: req.body.user.permission,
    section: req.body.user.section,
    passwordhash: bcrypt.hashSync(req.body.user.password, 10)
  }).then(
    (createSuccess = user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    }),
    (createError = err => res.send(500, err.message))
  );
});

//POST: log in
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.user.email } }).then(
    user => {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.passwordhash,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                user: user,
                message: "successfully authenticated",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "unable to authenticate" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "unable to authenticate" });
      }
    },
    err => res.status(501).send({ error: "unable to authenticate)" })
  );
});

//GET: list all instructors (for students)
router.get("/instructors", validateSession, (req, res) =>
  User.findAll({ where: { permission: "instructor" } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: single user (for grading table)
router.get('/:id',validateSession, (req,res)=>
  User.findOne({where:{id: req.params.id}})
    .then(data=>res.json(data))
    .catch(err=>res.status(500).json(req.errors))
)

// WARNING: PATHS BELOW SHOULD BE ACCESSIBLE TO ADMIN ALONE

//GET: list all users (admin only)
router.get("/", validateSession, (req, res) =>
  User.findAll()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update a user
router.put("/:id", validateSession, (req, res) =>
  User.update(req.body.user, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE: delete a user
router.delete("/:id", validateSession, (req, res) =>
  User.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
