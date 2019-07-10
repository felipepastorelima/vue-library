const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const loan = sequelize.define(
    'loan',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.VIRTUAL,
        get: function() {
          if (this.get('returnDate')) {
            return 'closed';
          }

          if (
            moment().isAfter(moment(this.get('dueDate')))
          ) {
            return 'overdue';
          }

          return 'inProgress';
        },
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  loan.associate = (models) => {
    models.loan.belongsTo(models.book, {
      as: 'book',
      constraints: false,
    });

    models.loan.belongsTo(models.user, {
      as: 'member',
      constraints: false,
    });

    models.loan.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.loan.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return loan;
};
