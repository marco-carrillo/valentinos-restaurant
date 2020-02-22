module.exports = function(sequelize, DataTypes) {
  var Order_status = sequelize.define("Order_status", {
    // Giving the role a name of type STRING
    name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    final_status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

  Order_status.associate = function(models) {
    // Associating Order_status with Orders
    // When an order_status is deleted, also delete any associated orders
    Order_status.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Order_status;
};
