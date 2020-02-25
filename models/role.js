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

  return Role;
};
