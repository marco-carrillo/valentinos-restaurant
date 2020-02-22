module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("Role", {
        role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }

      },
      is_admin: {
          type: DataTypes.BOOLEAN
    }

    });
  
  
    return Role;
  };