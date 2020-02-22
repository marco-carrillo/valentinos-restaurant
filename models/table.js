module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
        max_seating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 2
      }
    });

    return Table;
  };
