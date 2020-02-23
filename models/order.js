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

    Order.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Order.belongsTo(models.Order_status, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Order.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Order.belongsTo(models.Table, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Order.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Order.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Order.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Order.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Order;
};
