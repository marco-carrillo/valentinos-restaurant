module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    // Giving the role a name of type STRING
    name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    max_seating:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

  Table.associate = function(models) {
    // Associating Role with orders
    // When a table is deleted, also delete any associated orders
    Table.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Table;
};
