const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize){
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Nome é requerido",
                    }
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Email é requerido" },
                    isEmail: {
                        msg: "Insira um email válido",
                    },
                    // unique:
                }
            },
        }, {
            sequelize
        });
    }

    static associate(models){
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports = User;
// class User extends Model {}
// User.init({

// })