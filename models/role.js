module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    // Giving the role a name of type STRING
    name: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    is_admin:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

  Role.associate = function(models) {
    // Associating Role with Users
    // When a role is deleted, also delete any associated users
    Role.hasMany(models.User, {
      onDelete: "cascade"
    });
  };

  return Role;
};
