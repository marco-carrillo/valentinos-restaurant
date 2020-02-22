module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    // Giving the role a name of type STRING
    customer_name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    status_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    table_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    server_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chef_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_bill:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        default: true
    }
});

//  Creating a foreign key with status
Order.associate = function(models) {
    Order.belongsTo(models.Order_status, {
        foreignKey: {
        allowNull: false
        }
    });
};
   
//  Creating a foreign key with tables
Order.associate = function(models) {
    Order.belongsTo(models.Table, {
        foreignKey: {
        allowNull: false
        }
    });
};

  return Order;
};
