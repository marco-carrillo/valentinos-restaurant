module.exports = function(sequelize, DataTypes) {
    var Meal = sequelize.define("Meal", {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      time_to_prepare: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      meal_cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        default: 0
    },
    meal_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        default: 0
    },
    meal_incentive: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        default: 0
    },
    active: {
        type: DataTypes.BOOLEAN,
        default: true
    }
    });
  
    Meal.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Meal.belongsTo(models.Meal_type, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Meal;
  };