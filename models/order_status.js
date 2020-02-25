module.exports = function (sequelize, DataTypes) {
    var Order_status = sequelize.define("Order_status", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        final_status: {
            type: DataTypes.BOOLEAN,
            default: true
      }
    });

    return Order_status;
};
