module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
    },
      occupied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
         default: false
      },
      max_seating: {
        type: DataTypes.INTEGER,
        allowNull: false,
         default: 2
        },
  
    });

    return Table;
  };
