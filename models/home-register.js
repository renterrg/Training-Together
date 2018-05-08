module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    progress: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true,
      validate: {
        min: 0,
        max: 1
      },
      defaultValue: 0
    }
  });
  return User;
};