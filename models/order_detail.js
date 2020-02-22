module.exports = function(sequelize, DataTypes) {
  var Order_detail = sequelize.define("Order_detail", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull:  false
    },
    meal_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    party_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        default: true
    }
});

//  Creating a foreign key with order
Order_detail.associate = function(models) {
    Order_details.belongsTo(models.Order, {
        foreignKey: {
        allowNull: false
        }
    });
};
   
//  Creating a foreign key with Meal
Order_detail.associate = function(models) {
    Order_detail.belongsTo(models.Meal, {
        foreignKey: {
        allowNull: false
        }
    });
};

  return Order_detail;
};