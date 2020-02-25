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
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        default: true
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        default: true
    }
});

  return Order_detail;
};