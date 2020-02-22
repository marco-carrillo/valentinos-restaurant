module.exports = function(sequelize, DataTypes) {
    var Order_detail = sequelize.define("Order_detail", {
        party_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
  
    Order_detail.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Order_detail.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false
        }
      })
      Order_detail.belongsTo(models.Meal, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Order_detail;
  };