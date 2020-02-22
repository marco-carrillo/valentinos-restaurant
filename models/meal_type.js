module.exports = function(sequelize, DataTypes) {
  var Meal_type = sequelize.define("Meal_type", {
    // Giving the role a name of type STRING
    name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    requires_id:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

  Meal_type.associate = function(models) {
    // Associating Meal_type with Meal
    // When a meal-type is deleted, also delete any associated meals
    Meal_type.hasMany(models.Meal, {
      onDelete: "cascade"
    });
  };

  return Meal_type;
};
