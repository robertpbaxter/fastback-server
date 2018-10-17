module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("submission", {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(524000),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Submission;
};
