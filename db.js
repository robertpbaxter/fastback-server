const Sequelize = require("sequelize");

//Use this for development
// const sequelize = new Sequelize(
//   "postgresql://postgres:" +
//     encodeURIComponent(process.env.PW) +
//     "@localhost/instructionalapp",
//   {
//     dialect: "postgres"
//   }
// );

//Use this for deployment
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(
    () => console.log("Connected to instructional app database"),
    err => console.log(err)
  );

module.exports = sequelize;
