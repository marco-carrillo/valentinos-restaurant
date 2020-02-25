module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        table_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        host_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chef_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_bill: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            default: 0
        }
    });


    return Order;
};
