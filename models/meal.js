module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define("Meal", {
    // Giving the role a name of type STRING
    name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    time_to_prepare:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    incentive:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    },

    meal_type_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

  return Meal;
};
