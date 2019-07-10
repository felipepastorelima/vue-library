module.exports = function(sequelize, DataTypes) {
  const todo = sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 255],
          notEmpty: true
        }
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  return todo;
};
