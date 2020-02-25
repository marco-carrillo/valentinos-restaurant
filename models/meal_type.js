module.exports = function(sequelize, DataTypes) {
    var Meal_type = sequelize.define("Meal_type", {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }

      },
      requires_id: {
          type: DataTypes.BOOLEAN,
          default: true
    },
    menu_order: {
      type: DataTypes.BOOLEAN,
      default: true
    }

    });
  
  
    return Meal_type;
  };
