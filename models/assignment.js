module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("assignment", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING(525000),
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Assignment;
};
