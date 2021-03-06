const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIComponent(
      process.env.PW
    )}@localhost/instructionalapp`,
  {
    dialect: "postgres"
  }
);

sequelize
  .authenticate()
  .then(
    () => console.log("Connected to instructional app database"),
    err => console.log(err)
  );

module.exports = sequelize;
