const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_URL_1 +
    `${encodeURIComponent(process.env.DB_URL_2)}` +
    process.env.DB_URL_3,
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
